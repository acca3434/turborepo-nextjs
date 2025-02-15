"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import type EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { type z } from "zod"

import "@/styles/editor.css"
import { type PostProps } from "types"
import { postSchema } from "@/lib/validation/post"
import { buttonVariants, cn, toast } from "@shared/ui"
import { Icons } from "@/components/icons"

type FormData = z.infer<typeof postSchema>

export const Editor = ({ post }: PostProps) => {
  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(postSchema),
  })

  const ref = useRef<EditorJS>()

  // @see https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook
  const router = useRouter()

  const [isMounted, setIsMounted] = useState<boolean>(false)
  const [isSaving, setIsSaving] = useState<boolean>(false)

  const initEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default

    const body = postSchema.parse(post)

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Type here to write your post...",
        data: body.content,
        inlineToolbar: true,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [post])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    if (isMounted) {
      initEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initEditor])

  const onSubmit = async (data: FormData) => {
    setIsSaving(true)

    const blocks = await ref.current?.save()

    const response = await fetch(`/api/posts/${post._id.toString()}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: data.title,
        content: blocks,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not saved. Please try again.",
      })
    }

    router.refresh()

    return toast({
      description: "Your post has been saved",
    })
  }

  if (!isMounted) {
    return null
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
            <p className="text-sm text-muted-foreground">Draft</p>
          </div>
          <button type="submit" className={cn(buttonVariants())}>
            {isSaving && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            <span>Save</span>
          </button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px]">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none"
            {...register("title")}
          />
          <div id="editor" className="min-h-[500px]"></div>
          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </div>
    </form>
  )
}
