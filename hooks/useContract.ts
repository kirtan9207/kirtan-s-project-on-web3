// hooks/useContract.ts
"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface ForumPost {
  author: string
  message: string
  timestamp: number
}

export const useForumContract = () => {
  const { address } = useAccount()
  const [posts, setPosts] = useState<ForumPost[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { data: postCount, refetch: refetchPostCount } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getPostCount",
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  })

  const loadPosts = async () => {
    if (!postCount) return

    try {
      const count = Number(postCount as bigint)
      const loaded: ForumPost[] = []

      for (let i = 0; i < count; i++) {
        const result: any = await window.ethereum.request({
          method: "eth_call",
          params: [
            {
              to: contractAddress,
              data: null,
            },
          ],
        })
        // We'll instead use wagmi read, simpler:
      }
    } catch (err) {
      console.error("Error loading posts:", err)
    }
  }

  useEffect(() => {
    if (postCount) loadPosts()
  }, [postCount])

  useEffect(() => {
    if (isConfirmed) {
      refetchPostCount()
      loadPosts()
    }
  }, [isConfirmed])

  const createPost = async (message: string) => {
    if (!message) return
    try {
      setIsLoading(true)
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "createPost",
        args: [message],
      })
    } catch (err) {
      console.error("Error creating post:", err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    data: {
      posts,
      postCount: postCount ? Number(postCount as bigint) : 0,
    },
    actions: { createPost },
    state: {
      isLoading: isLoading || isPending || isConfirming,
      isPending,
      isConfirming,
      isConfirmed,
      hash,
      error,
    },
  }
}
