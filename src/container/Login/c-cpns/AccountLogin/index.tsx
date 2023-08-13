import { FC } from "react"
import { TabsContent } from "@/components/ui/tabs.tsx"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card.tsx"
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
import { Checkbox } from "@/components/ui/checkbox.tsx"
import { Button } from "@/components/ui/button.tsx"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { IAccountFormInputs } from "@/container/Login/interface.ts"
import * as z from "zod"
import { RE__PASSWD_INTENTION } from "@/constants"
import { useOnSubmit } from "@/hooks/useOnSubmit.ts"

const accountLoginFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, {
      message: "Username must be at least 2 characters."
    })
    .max(15, {
      message: "Name must not be longer than 15 characters."
    }),
  password: z.string().trim().min(6, {
    message: "Password must be at least 6 characters."
  }),
  remPass: z.boolean().default(false)
})

type AccountLoginFormValues = z.infer<typeof accountLoginFormSchema>

const defaultValues: Partial<AccountLoginFormValues> = {
  remPass: false
}

const AccountLogin: FC = () => {
  const form = useForm<AccountLoginFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(accountLoginFormSchema),
    defaultValues
  })

  const onSubmit = useOnSubmit<IAccountFormInputs>(form)

  return (
    <TabsContent value="account">
      <Card className="w-[400px] dark:border-white rounded">
        <CardHeader>
          <CardTitle>Login your account</CardTitle>
          <CardDescription>
            Enter your username below to longin your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                name="username"
                rules={{
                  required: true
                }}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="username" {...field} />
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
                  required: true,
                  pattern: RE__PASSWD_INTENTION
                }}
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your personal password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="remPass"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 leading-none">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>check for remember password</FormLabel>
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

export default AccountLogin
