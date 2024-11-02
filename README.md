- [x] navigation integration
- [ ] build dashboard using shadcn components
- [ ] dashboard template
- [ ] dashboard structure
- [x] dropdown component
- [ ] org switcher integration
- [ ] upload / attach file
- [ ] api keys
- [ ] projects list
- [ ] projects create
- [ ] projects update
- [ ] projects detail
- [ ] projects archive
- [ ] organizations list
- [ ] organizations create
- [ ] organizations update
- [ ] organizations invite
- [ ] member manage
- [ ] member revoke

UI
- [x] integrate shadcn workflow https://pro.magicui.design/?ref=shotgun
- [x] fix postcss/tailwind no-conf flow
- [x] move dependencies to packages/novel
- [x] marketing pages
- [x] responsive marketing
- [x] load openapi
- [x] sdk
- [x] sdk with zod validation
- [x] remove webhook and unstable from sdk
- [x] npm run build
- [x] header navigation
- [x] pricing page with hydration
- [x] login with social
- [x] login with password
- [x] login with passwordless
- [x] forget password
- [x] reset password
- [x] verify email
- [x] login error flow
- [x] login require registration error flow
- [x] frontpage remove app/context
- [x] integrate shadcn button to button
- [x] integrate shadcn button to input
- [x] mobile web login
- [x] sign up with password
- [x] welcome page
- [x] sign up with upfront payment
- [x] sign up with social
- [x] sign up with specific plan with trial
- [x] plan selector in upfront payment
- [x] card design
- [x] sign up with specific plan with upfront payment
- [x] sign up card error flow
- [x] sign up with specific plan with interval
- [x] responsive sign up
- [x] shadcn sidebar component
- [x] app layout
- [x] useSession hook
- [x] useAuthorized hook
- [x] useFeature hook from flags
- [x] getSession redirect error
- [ ] responsive dashboard
- [ ] dashboard 400 / 500
- [ ] 404
- [ ] 500
- [ ] make modal work
- [ ] make modal do overflow
- [ ] i18n support
- [ ] sign in zod form validation
- [ ] sign up zod form validation
- [ ] reset zod form validation
- [ ] forget zod form validation
- [ ] magic link form validation
- [ ] convert text to t()
- [ ] localization test
- [ ] translate to ES, CN, KR, JP
- [ ] test csp
- [ ] login mfa
- [ ] analytics
- [ ] playwright
- [ ] customize the theme
- [ ] create theme - typography, color rule, spacing, border, shadow on medusa
- [ ] try to build marketing with shadcn magic components

Devtools
- [ ] request list client/server
- [ ] request list waterfall
- [ ] check if git is public or private
- [ ] check first deployment by pinging home
- [ ] installation app
- [ ] job list
- [ ] queries list
- [ ] errors list
- [ ] mails sent
- [ ] auth/session info
- [ ] utilization

v1.1
- [ ] test dark mode
- [ ] contact page
- [ ] newsletter subscription
- [ ] more feature components
- [ ] infer rpc route types
- [ ] new dynamic page, auto hook data with server/api/web/* route
- [ ] /login/confirm - resend confirmation email if not received


non react 19
- @stripe/react-stripe-js
- react-dropzone
- react-hook-form
- react-hot-toast
- react-tooltip


caveats
- need to restart both server and client to get new schemas

why
- shadcn? need a design system that can build a foundation on, and shadcn has 
  good enough DX to create that design system.