sunday
- [ ] organization activity list
- [ ] account notifications
- [ ] manage notifications
- [ ] accept / reject invite
- [ ] account activity list

monday
- [ ] overview page
- [ ] logout
- [ ] add logout screen
- [ ] manage api keys
- [ ] api key access history

tuesday
- [ ] activity page / org events
- [ ] switch organizations
- [ ] projects list

wednesday

wednesday
- [ ] task manage
- [ ] projects create
- [ ] projects update
- [ ] task detail
- [ ] projects archive

thursday
- [ ] modify marketing to look like mintlify
- [ ] BUG: collapsed sidebar has no link
- [ ] clean up overwhelming code in forms
- [ ] fix the rpc undefined problem
- [ ] deactivate organization
- [ ] deactivate account
- [ ] login with mfa

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
- [x] navigation integration
- [x] dashboard structure
- [x] dropdown component
- [x] org switcher integration
- [x] organizations name/email update
- [x] account profile
- [x] upload / attach file
- [x] update notification / settings
- [x] zod validations on existing forms
- [x] errors
- [x] account security
- [x] update password
- [x] manage mfa
- [x] session management
- [x] org list
- [x] organizations create modal
- [x] organization subscription
- [x] org view quotas
- [x] org manage billing
- [x] charges list
- [x] org cancel subscription
- [x] org change subscription
- [x] member invite
- [x] member manage
- [x] member revoke
- [x] change role
- [ ] responsive dashboard
- [ ] dashboard 400 / 500
- [ ] 404
- [ ] 500
- [ ] robots.txt get all routes from app/(marketing)
- [ ] manifest.json
- [ ] i18n support
- [ ] sign in zod form validation
- [ ] sign up zod form validation
- [ ] reset zod form validation
- [ ] forget zod form validation
- [ ] magic link form validation
- [ ] convert text to t()
- [ ] localization test
- [ ] deactivate account
- [ ] translate to ES, CN, KR, JP
- [ ] test csp
- [ ] analytics
- [ ] playwright
- [ ] customize the theme
- [ ] create theme - typography, color rule, spacing, border, shadow on medusa
- [ ] try to build marketing with shadcn magic components
- [ ] test dark mode for marketing
- [ ] https://github.com/hashicorp/nextjs-bundle-analysis?

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
- [ ] contact page
- [ ] newsletter subscription
- [ ] more feature components
- [ ] infer rpc route types
- [ ] new dynamic page, auto hook data/actions with server/api/web/* route
- [ ] /login/confirm - resend confirmation email screen if not received
- [ ] public profile / platform profile like public github accounts
- [ ] standardize select to be ...registerable
- [ ] standardize toggle to be ...registerable
- [ ] leave organization
- [ ] org add payment method

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