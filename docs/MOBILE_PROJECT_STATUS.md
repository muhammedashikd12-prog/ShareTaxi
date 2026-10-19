# ShareTaxi.co Mobile Project Status

## Overview
The ShareTaxi.co web app remains intact and the Expo mobile prototype continues to be developed in parallel. This document captures the verified state after the booking-flow and route-state stabilization pass.

## Focused Android follow-up (2026-10-19)
- Re-ran `npm run typecheck:mobile`: passed.
- Re-ran the mobile Jest suite: 1 suite and 6 tests passed.
- Re-ran `npm run build:mobile` (Expo web export): passed.
- Re-ran `npx expo export --platform android --clear`: passed; Android JavaScript bundle exported successfully.
- Started Metro with `npm run start --workspace apps/mobile -- --port 8083 --clear`; `http://localhost:8083` returned HTTP 200.
- ADB detects `emulator-5554`, but Android did not finish booting. Package Manager and Activity Manager are unavailable, so Expo Go and the app could not be launched and no native UI interaction was verified.
- Android logcat reports a fatal SystemServer/PackageManager startup error reading `/data/misc/apexdata/com.android.permission/access.abx` (`Unexpected magic 3f533656`). The existing AVD data was not wiped or modified; this may contain user data.
- No app source or shared website code changed during this follow-up.

## Native Android recovery and launch (2026-10-19)
- Original AVD `Medium_Phone_API_36.0` remained unhealthy after a bounded wait, `adb reboot`, and a cold boot with `-no-snapshot-load`. Each boot reproduced a fatal PackageManager/SystemServer failure reading `/data/misc/apexdata/com.android.permission/access.abx` and its `.reservecopy` (`Unexpected magic 3f533656`). `sys.boot_completed` remained unset, `bootanim` stayed running, `pm list packages` reported `Can't find service: package`, and `dumpsys activity activities` reported `Can't find service: activity`.
- ADB itself was responsive and the device was listed as `device`, so restarting the ADB server was not indicated. The original AVD was stopped cleanly and left intact; its userdata was not wiped and the AVD was not deleted.
- A separate `ShareTaxi_Medium_API_36_Recovery` AVD was created from the already-installed `system-images;android-36;google_apis_playstore;x86_64` image with the `medium_phone` hardware profile. It booted with `sys.boot_completed=1`; Package Manager listed packages and Activity Manager showed the launcher. This avoids altering the original AVD.
- Expo configuration resolves to SDK 58.0.0 (mobile package `expo` `~58.0.14`). The app has no `expo-dev-client` dependency and no generated `android/` or `ios/` directory, so the configured workflow is Expo Go, not a custom development client.
- The clean AVD did not have Expo Go installed, and its Play Store required sign-in. Expo Go 58.0.4 was obtained from the release linked by Expo's `expo.dev/go` page, matched against GitHub release asset SHA-256 `bd3d36794f3e060a1dd93bec7affdceb516294c1b33abbf63d2994f5cc66b3a6`, and verified with Android `apksigner` before installation. `adb install -r` succeeded; package `host.exp.exponent` reports version `58.0.4`.
- Expo server was active at port 8083. `adb reverse tcp:8083 tcp:8083` was set, and `adb shell am start -a android.intent.action.VIEW -d exp://127.0.0.1:8083` opened ShareTaxi in `host.exp.exponent/.experience.ExperienceActivity`.
- Native UI was directly inspected using ADB screenshot and UI hierarchy: ShareTaxi prototype/onboarding screen rendered, **Continue to app** opened the account setup screen, **Skip for now** opened Home, and the Intercity quick action opened Intercity search showing Kochi → Bengaluru, departure date, passenger count, and the available prototype trip.
- Android logcat confirmed `ReactNativeJS: Running "main"` with runtime `exposdk:58.0.0`; Metro returned `packager-status:running`. No fatal exception or unhandled JS error appeared during this smoke test. Non-fatal logs included the existing React Native `SafeAreaView` deprecation warning and an Expo Go keyboard-controller `ReactNoCrashSoftException` during startup; neither prevented rendering or navigation.
- No mobile application or website source code changed during this native recovery pass.

## Repository audit
- Root workspace: valid npm workspaces for `apps/*` and `packages/*`.
- Mobile app: present under `apps/mobile` with Expo Router, TypeScript config, Android package metadata, and route-based navigation.
- Web app: preserved and not replaced.
- Git state: this environment does not contain a Git repository root, so there was no git status to preserve here. The project files were worked in-place without overwriting unrelated user work.
- React versions remain scoped by app: the web workspace uses React 18; the Expo app uses React 19 as required by React Native 0.88. The mobile Metro resolver maps `react` and `react-dom` to the mobile workspace copies to avoid cross-workspace React mixing.

## Android and runtime configuration
- The original `Medium_Phone_API_36.0` AVD remains corrupted and does not boot Android services. Native ShareTaxi testing was instead performed on the separate, healthy `ShareTaxi_Medium_API_36_Recovery` API 36 AVD, connected as `emulator-5554`.
- ADB path used: `C:\Users\Share\AppData\Local\Android\Sdk\platform-tools\adb.exe`.
- The Expo Go workflow used the active server at `http://localhost:8083`, `adb reverse tcp:8083 tcp:8083`, and the Android deep link `exp://127.0.0.1:8083`.
- Expo Go 58.0.4 is installed on the recovery AVD. The original AVD does not have usable Android package/activity services.

## Commands executed
- `adb devices` (confirmed emulator online)
- `npm run typecheck:mobile`
- `cd apps/mobile && npx jest --watch=false --runInBand`
- `npm run build:mobile`
- `npx expo export --platform android --clear`
- `npm run build` (existing web app)
- `CI=1 npx expo start --android --port 8083` from `apps/mobile`
- `curl.exe -I http://localhost:8083` (Metro health check)
- Browser-based Expo web UI smoke test against `http://localhost:8083`

## Verified results
- Android device connection: confirmed via ADB (`emulator-5554` online).
- Mobile TypeScript validation: passed.
- Automated regression tests: passed (`6/6` tests green), covering booking creation, duplicate/invalid/over-capacity rejection, one-time seat restoration, rescheduling, exact-route/capacity matching, and commute preference toggles.
- Expo export build: passed via `expo export --platform web --clear`.
- Android export bundle: passed via `npx expo export --platform android --clear`.
- Website production build: passed via `npm run build`.
- Metro server: responding on `http://localhost:8083` with HTTP 200.
- Expo compatibility check still recommends newer Jest development packages; current Jest 29 and ts-jest 29 run the tests successfully, and the advisory does not block either app build.

## Booking flow verification
- Browser-tested empty route validation and an unmatched route; neither falls through to an unrelated trip.
- Browser-tested passenger availability filtering; a four-passenger search correctly shows no result for a three-seat sample trip.
- Browser-tested valid search → sample trip details → booking review → confirmation → booking detail → My Bookings.
- The selected search date, pickup, passenger count, and estimated fare were carried into the confirmed booking and history.
- Browser-tested rescheduling through the date modal; the booking becomes Upcoming and the selected date appears in My Bookings.
- Browser-tested the cancellation confirmation modal, dismiss action, and confirmed cancellation; history updates to Cancelled. Automated tests verify seat availability is restored exactly once.
- Sample driver, rating, availability, and tracking content is labeled as prototype/demo data; there is no claim of live dispatch or payment.

## Genuine issues identified and corrected
- Confirmation previously routed intercity bookings through the on-demand request status screen; it now opens the saved booking detail.
- Unmatched searches previously routed to an unrelated first trip; search now uses exact route matches and remaining seat capacity.
- Booking creation now rejects duplicate references, invalid seat counts, unavailable trips, and over-capacity bookings before changing state.
- Repeated cancellation previously restored seats repeatedly; cancellation now restores once and cancelled/completed bookings cannot be reopened.
- Rescheduling previously changed only the status; it now asks for a different date and updates the booking to Upcoming.
- The cancel confirmation now uses an in-app modal, so its behavior works in both native and web renderers.
- Booking history refreshes when focused, and newly confirmed bookings have a direct My Bookings action.
- Fixed the React workspace split and Metro resolution so the mobile app uses React 19 while the website remains on React 18.
- Installed the Expo Router runtime modules missing from the mobile dependency set.

## Remaining blockers and limitations
- Click-by-click verification was performed in the Expo web rendering using the shared browser. It is not Android emulator UI testing.
- The original `Medium_Phone_API_36.0` AVD remains unusable due to unreadable permission-state files in its userdata. It was not wiped or deleted. Recovery testing is available on `ShareTaxi_Medium_API_36_Recovery`; repeat on the original only after a separately approved repair or backup/restore.
- The native tap-through in this pass covered onboarding, Home, and Intercity search only; the complete booking lifecycle and other flows have not yet been manually tapped on Android.
- Expo Go emitted a non-fatal keyboard-controller soft exception and a SafeAreaView deprecation warning. The screen continued to render and navigate; monitor these if they become user-visible.
- The app remains prototype-only: no real payment processing, live dispatch, driver tracking, or backend persistence are connected.
- Booking state is in memory only and is lost on app reload or process restart. A booking detail deep link after reload correctly reports that the booking is not present in that session.

## Current status
- Web app: intact and preserved.
- Mobile app: TypeScript clean, regression tests passing, and both web and Android Expo bundles build successfully.
- Website: production build passes and the existing site remains intact.
- Expo server: active at `http://localhost:8083`; ShareTaxi is open in Expo Go on the recovery API 36 AVD. The original API 36 AVD remains broken.
- Product flow status: intercity booking, booking history/detail, cancellation, rescheduling, on-demand, commute, profile, and settings remain prototype-only.

## Recommended next priorities
- If the original AVD must be recovered, back it up first and use Android Studio's non-destructive repair options; do not wipe its data without explicit approval. The recovery AVD is ready for further native QA using the checklist below.
- Run the remaining native checklist on `ShareTaxi_Medium_API_36_Recovery`, especially booking lifecycle, keyboard layout, modal sizing, and back navigation.
- Add durable local or backend persistence only when explicitly in scope; current booking and commute state resets on reload.
- Keep prototype realism high without making live claims about wallet balances, driver tracking, payments, or support.
- If payment or backend integration work is later required, add it behind explicit feature flags and do not connect it to this prototype by default.

## Remaining native emulator checklist
1. Use the running `ShareTaxi_Medium_API_36_Recovery` AVD (or another healthy API 36 emulator). Confirm `adb devices` reports the device as `device` and `adb shell getprop sys.boot_completed` returns `1`. The original `Medium_Phone_API_36.0` AVD remains corrupted; do not wipe its data without the owner's approval.
2. From `apps/mobile`, run `npx expo start --android --port 8083 --clear` and confirm Expo Go opens the app without a bundling error or red screen.
3. On Home, move between all ride modes, then open Intercity. Submit blank fields and an unmatched route; confirm validation/no-results rather than an unrelated trip. Search Kochi to Bengaluru for two passengers, then try four passengers to verify seat filtering.
4. Open the matching trip and inspect departure, pickup, fare, and remaining seats. Continue to review, go back without confirming, and verify no booking was created. Confirm once and verify the saved booking details and My Bookings entry.
5. Open that booking, reschedule it to another date, and confirm the date/status in history. Start cancellation and dismiss it; confirm it remains active. Confirm cancellation and verify Cancelled status and that availability is restored only once.
6. In On-demand, submit missing pickup/destination and verify validation. Submit valid values and confirm the resulting screen labels matching/status as simulated, not live.
7. Create a recurring commute, edit its values, navigate away and back to verify it remains during the session, then disable it and confirm the disabled state.
8. Visit Bookings, Profile, and Settings; verify navigation works and incomplete account, payment, safety, and support features are described as unavailable/demo-only. Check keyboard scrolling, modal sizing, touch targets, and Android back navigation throughout.
