import React from 'react'

const FormField = () => {
  return (
      <FormField 
     control={form.control}
        name="username"
     render={({field})=>(
      <FormItem>
        <FormLabel>UserName</FormLabel>
        <FormControl >
          <Input placeholder="Enter your userName" {...field}/>
        </FormControl>
          <FormDescription>
                This is your public display name.
              </FormDescription>

      </FormItem>
     )}
     />
  )
}

export default FormField
