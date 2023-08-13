import { FC, useEffect, useRef, useState } from "react"
import { useMutation } from "@apollo/client"
import { SEND_MSG_CODE } from "@/graphql/auth.ts"
import { TabsContent } from "@/components/ui/tabs.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form.tsx"
import { Input } from "@/components/ui/input.tsx"
import { Button } from "@/components/ui/button.tsx"
import { IMsgCodeFormInputs } from "@/container/Login/interface.ts"
import { RE__MOBILE } from "@/constants"
import { useOnSubmit } from "@/hooks/useOnSubmit.ts"

interface IMsgCodeLoginProps {}

const msgCodeLoginFormSchema = z.object({
  tel: z
    .string()
    .min(11, {
      message: "Make sure the input format is correct."
    })
    .max(11, {
      message: "Make sure the input format is correct."
    }),
  code: z
    .number()
    .min(4, {
      message: "Make sure the input format is correct."
    })
    .max(4, {
      message: "Make sure the input format is correct."
    })
})

type AccountLoginFormValues = z.infer<typeof msgCodeLoginFormSchema>

const defaultValues: Partial<AccountLoginFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

const MsgCodeLogin: FC<IMsgCodeLoginProps> = () => {
  const [run] = useMutation(SEND_MSG_CODE)
  const [count, setCount] = useState(60)
  const [disabled, setDisabled] = useState(false)
  const timerRef = useRef<number | null>(null)

  const form = useForm<AccountLoginFormValues>({
    resolver: zodResolver(msgCodeLoginFormSchema),
    defaultValues
  })

  const onSubmit = useOnSubmit<IMsgCodeFormInputs>(form)

  // 写一个60s的倒计时函数
  const countDown = () => {
    timerRef.current = window.setInterval(() => {
      setCount(prevCount => {
        if (prevCount === 1) {
          clearInterval(timerRef.current!)
          setDisabled(false)
          setCount(60)
        }
        return prevCount - 1
      })
    }, 1000)
  }

  useEffect(() => {
    if (disabled) {
      countDown()
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [disabled])

  return (
    <TabsContent value="msg">
      <Card className="w-[400px] dark:border-white rounded">
        <CardHeader>
          <CardTitle>Login with msg code</CardTitle>
          <CardDescription>
            Enter your tel and send for the msg code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                name="tel"
                rules={{
                  required: true,
                  pattern: RE__MOBILE
                }}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl>
                      <Input placeholder="telephone" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                rules={{
                  required: true
                }}
                name="code"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>msg code</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input {...field} className="w-[200px] mr-5" />
                      </FormControl>
                      <Button
                        disabled={disabled}
                        className="flex-1"
                        onClick={() => {
                          form.trigger("tel")
                          setDisabled(true)
                          run({ variables: { tel: form.getValues("tel") } })
                        }}
                      >
                        code{disabled ? `(${count}s)` : ""}
                      </Button>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-[350px] mx-auto">
                Log in
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </TabsContent>
  )
}

export default MsgCodeLogin