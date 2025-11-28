// components/sample.tsx
"use client"

import { useState } from "react"
import { useAccount } from "wagmi"
import { useForumContract } from "@/hooks/useContract"

const SampleForum = () => {
  const { isConnected } = useAccount()
  const [message, setMessage] = useState("")

  const { data, actions, state } = useForumContract()

  const handleCreatePost = async () => {
    if (!message) return
    try {
      await actions.createPost(message)
      setMessage("")
    } catch (err) {
      console.error("Error:", err)
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold text-foreground mb-3">Simple Forum</h2>
          <p className="text-muted-foreground">Please connect your wallet to interact with the forum.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold text-foreground">Simple Forum</h1>

        {/* Create Post */}
        <div className="bg-card border border-border p-4 rounded-lg space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Create a Post</h2>
          <textarea
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full h-24 p-3 bg-background border border-border rounded-lg"
          />
          <button
            onClick={handleCreatePost}
            disabled={state.isLoading || !message}
            className="w-full px-6 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            {state.isLoading ? "Posting..." : "Post Message"}
          </button>
        </div>

        {/* Posts */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">All Posts</h2>
          {data.posts.length === 0 && (
            <p className="text-muted-foreground">No posts yet.</p>
          )}

          {data.posts.map((post, i) => (
            <div key={i} className="bg-card border border-border p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">By: {post.author}</p>
              <p className="text-foreground mt-2">{post.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(post.timestamp * 1000).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Transaction Info */}
        {state.hash && (
          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-xs text-muted-foreground">Transaction Hash:</p>
            <p className="text-xs break-all">{state.hash}</p>
          </div>
        )}

        {state.error && (
          <div className="p-4 bg-card border border-destructive rounded-lg">
            <p className="text-sm text-destructive">{state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleForum
