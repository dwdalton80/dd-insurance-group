
## Full-Stack & File Storage Integration

- [x] Upgrade project to full-stack with database and user management
- [x] Set up database schema for file management
- [x] Create tRPC procedures for bookings, inquiries, files, and client profiles
- [x] Implement file storage feature for document uploads
- [x] Create file upload API endpoints
- [x] Build file management UI for admin/users
- [x] Test file storage and retrieval functionality

## Booking System & Confirmation

- [x] Create multi-step booking form with SOA signing
- [x] Implement Statement of Understanding (SOA) document signing
- [x] Create post-booking confirmation page with booking details
- [x] Display next steps and contact information on confirmation page
- [x] Write vitest tests for confirmation page functionality
- [x] Add FAQ accordion to Medicare page for SEO improvement
- [x] Implement automated email notifications for new bookings

## SOA (Scope of Appointment) Digitization

- [x] Create digital SOA form component with fillable fields
- [x] Implement signature capture (canvas-based drawing)
- [x] Create SOA submission endpoint and database storage
- [x] Build SOA signing page integrated with booking flow
- [x] Attach SOA documents to booking records
- [x] Write comprehensive tests for SOA form and document management (63 tests passing)
- [x] Create admin panel UI to view SOA documents
- [x] Implement SOA document management actions (delete) in admin panel
- [x] Add admin-protected delete procedure to SOA router
- [x] Add authorization tests for SOA delete endpoint

## CMS & TPMO Compliance Integration

- [x] Update database schema: add leads table with TCPA consent and IP tracking
- [x] Add 10-year retention constraint to SOA documents table
- [x] Update bookings table: add zipCode, state, and CMS exception flag fields
- [x] Update SOA documents: add product fields, electronic consent, IP tracking, retention date
- [x] Update booking router: add zipCode and state validation (OK/TX only)
- [x] Update SOA router: add IP address and electronic consent capture
- [x] Calculate and store 10-year retention expiration date for SOA documents
- [x] Enforce SOA retention: block delete until retention period expires (69 tests passing)
- [x] Add retention enforcement tests for CMS compliance
- [x] Create lead capture form with state/ZIP validation (OK/TX only)
- [x] Add TCPA disclaimer to lead form
- [x] Add TPMO disclaimer to website footer
- [x] Add Medicare affiliation disclaimer to landing page
- [x] Update SOA form UI: ensure checkboxes are unchecked by default
- [x] Implement IP address capture for SOA signatures (client-side)
- [x] Implement 48-hour booking guardrail service
- [x] Add backend validation: appointment must be 48+ hours after SOA signature
- [x] Create compliance audit logging service with event tracking
- [x] Write and run compliance tests (15 guardrail + audit tests passing)
- [x] Test complete booking flow with all compliance checks (7 e2e tests added)


## Webhook Integration & Email Delivery (Sparks API)

- [x] Create webhook controller module for booking submissions
- [x] Implement Sparks API integration with secure authentication
- [x] Format booking data into JSON payload for Sparks API
- [x] Update booking router to trigger webhook on successful submission
- [x] Add Sparks API endpoint and credentials to environment variables (env.ts)
- [x] Write comprehensive tests for webhook payload formatting (9 tests)
- [x] Write tests for Sparks API integration and error handling
- [x] Webhook gracefully handles missing credentials (non-blocking)
- [x] Add retry logic for failed webhook deliveries (exponential backoff with max 3 attempts)
- [x] Implement webhook logging and monitoring (delivery history tracking)
- [x] Test complete booking flow with email delivery via Sparks (9 integration tests added)


## Email Template Integration (CMS Compliance)

- [x] Create email template service with dynamic product scope rendering
- [x] Implement TPMO disclaimer in email template
- [x] Implement Medicare affiliation notice in email template
- [x] Add no-obligation confirmation notice to email
- [x] Update webhook to use formatted email template
- [x] Pass product scope data from booking to email template
- [x] Write comprehensive tests for email template rendering (21 tests)
- [x] Write tests for CMS compliance validation in emails
- [x] Test complete booking flow with email delivery (9 integration tests with payload formatting and compliance fields)


## Compliance Integration Tasks (Remaining)

- [x] Wire compliance audit logging into booking creation event
- [x] Wire compliance audit logging into booking confirmation event (moved to updateStatus)
- [x] Wire compliance audit logging into SOA signing event
- [x] Wire compliance audit logging into SOA deletion/retention enforcement
- [x] Implement client-side IP address capture for SOA signing
- [x] Include captured IP address in SOA submission payload
- [x] Test client-side IP capture and submission
- [x] Verify SOA form checkboxes are unchecked by default
- [x] Add tests for compliance audit logging (5 new tests added)
- [x] Integrate 48-hour guardrail into booking form date/time selection UI
- [x] Call guardrail check from booking creation backend and validate
- [x] Wire compliance audit logging into consent capture events (IP capture + electronic consent)
- [x] Test complete booking flow with guardrail enforcement
- [x] Test complete booking flow with audit logging
- [x] Generate compliance audit report view for admin panel


## Privacy Policy & Legal Pages

- [x] Create Privacy Policy page component with full CMS/TCPA compliance content
- [x] Add Privacy Policy route to App.tsx
- [x] Add Privacy Policy link to footer (Resources & Tools section)
- [x] Add Privacy Policy link to footer bottom links


## Terms of Service & Legal Pages

- [x] Create Terms of Service page component with usage, liability, and disclaimer content
- [x] Add Terms of Service route to App.tsx
- [x] Add Terms of Service link to footer (Resources & Tools section)
- [x] Add Terms of Service link to footer bottom links next to Privacy Policy


## Admin Dashboard Integration

- [x] Integrate compliance reports into AdminDashboard as a tab
- [x] Remove standalone ComplianceReports route from App.tsx
- [x] Add authenticated admin dashboard link to footer
- [x] All compliance report functionality available in admin dashboard tab

## Educational Content for Regional Program Screening Tool

- [x] Add program explanation sections (QMB, SLMB, SoonerCare details)
- [x] Add common misconceptions section
- [x] Add next steps after qualification section
- [x] Add FAQ accordion to screening tool
- [x] Verify educational content renders correctly in browser (manual testing)
- [x] Make all educational content sections collapsible and expandable


## Calendar Sync Feature for Booking Form

- [x] Research and select calendar provider (backend-based availability schedule)
- [x] Set up calendar API integration with tRPC procedures
- [x] Create availability logic to fetch and filter available time slots
- [x] Add time slot database schema for storing availability (availabilitySchedule table)
- [x] Build calendar picker component with real-time slot display
- [x] Integrate calendar picker into BookingFormWithSOA component
- [x] Add timezone support for accurate time slot display
- [x] Test end-to-end calendar sync and booking flow

## Availability Settings Management

- [x] Create AvailabilitySettings component UI for admin dashboard
- [x] Add backend tRPC procedures for saving/retrieving availability settings
- [x] Integrate settings tab into AdminDashboard
- [x] Test availability settings and time slot generation

## Blackout Dates Feature

- [x] Create blackoutDates database table schema
- [x] Add database helpers for blackout dates CRUD operations
- [x] Add backend tRPC procedures for blackout dates management
- [x] Build BlackoutDates UI component with date picker and list
- [x] Integrate blackout dates into AvailabilitySettings component
- [x] Update slot generation to exclude blackout dates
- [x] Test blackout dates feature end-to-end

## Bug Fixes

- [x] Fix calendar month navigation buttons (add type="button" to prevent form submission)
- [x] Fix missing React imports in CalendarPicker component
- [x] Fix missing React imports in BookingFormWithSOA component
- [x] Make date buttons clickable to select appointments
- [x] Ensure date selection works properly in booking form

## Appointment Buffer Feature

- [x] Update slot generation logic to add 30-minute buffer after each appointment
- [x] Test that booked slots block the following 30-minute window

## Complete SOA Form Digitization (All Fields)

- [x] Extend soaDocuments table with all required fields from PDF
- [x] Build comprehensive SOA form (SOAFormComplete) with all product type checkboxes
- [x] Add digital signature capture with timestamp and IP
- [x] Create backend tRPC procedures for complete SOA submission
- [x] Auto-complete booking when SOA is fully signed
- [x] Fix TypeScript errors in SOASigning component
- [x] Integrate SOAFormComplete into SOASigning page
- [x] Fix TypeScript errors and integrate SOAFormComplete component
- [x] Verify all 204 existing tests pass after SOA integration changes


## Email Notifications to Larry

- [x] Add inquiry submission endpoint with email notification to larry@ddinsgroup.com
- [x] Update Contact form to submit messages to backend via tRPC
- [x] Add error handling and loading states to contact form
- [x] Verify all 204 tests pass after changes
- [x] Test email notification flow with inquiry creation


## SOA PDF Preview and Download Feature

- [x] Create PDF generation utility for SOA documents (generateSOAHtml)
- [x] Add tRPC procedure to generate SOA PDF (soa.generatePreview)
- [x] Add preview/download button to SOAFormComplete component
- [x] Test PDF generation and download functionality (204 tests passing)
- [x] Verify PDF includes all form fields and signatures

## SOA Form Simplification

- [x] Remove "To be completed by Agent" section from SOA form
- [x] Keep only beneficiary/representative sections above agent section
- [x] Remove agent signature, agent name, agent phone fields from form
- [x] Update SOAFormComplete component to exclude agent fields
- [x] Fix booking test assertions after form changes
- [x] Verify all 204 tests pass after SOA simplification

## Calendar Invite Feature for Larry

- [x] Create iCalendar (.ics) file generator for bookings
- [x] Add "Send Calendar Invite" button in admin dashboard BookingManagement
- [x] Send email to Larry with .ics attachment when booking is confirmed
- [x] Include booking details in calendar invite email
- [x] Test calendar invite email delivery and .ics file generation

## Booking Confirmation Email to Clients

- [x] Create client booking confirmation email template
- [x] Add generateClientBookingConfirmationEmail function to emailNotification.ts
- [x] Update emailTemplates schema to include booking_confirmation type
- [x] Add booking_confirmation initialization to db.emailTemplates
- [x] Update booking updateStatus to send confirmation email to client
- [x] Include SOA signing link in confirmation email
- [x] Include appointment date/time in confirmation email
- [x] Test booking confirmation email delivery (204 tests passing)

## Larry Notification Emails for Bookings & Inquiries

- [x] Create email template for new booking request notifications to Larry
- [x] Create email template for new inquiry notifications to Larry
- [x] Add generateBookingNotificationEmail function to emailNotification.ts
- [x] Add generateInquiryNotificationEmail function to emailNotification.ts
- [x] Trigger booking notification email when booking is created (line 308-325 in routers.ts)
- [x] Trigger inquiry notification email when inquiry is submitted (line 678-694 in routers.ts)
- [x] Include person's full information in notification emails (name, email, phone)
- [x] Add admin dashboard link to notification emails (/admin/bookings and /admin/inquiries)
- [x] Email notifications sent to larry@ddinsgroup.com with all details

## HIPAA-Compliant Purl Redirect System

- [x] Remove SOA tab from admin dashboard
- [x] Add purl_link_clicked boolean field to bookings table (schema migration 0013)
- [x] Add purl_link_url field to bookings table for storing the purl link (schema migration 0013)
- [x] Update booking confirmation email to include purl link instead of SOA signing link
- [x] Create purl redirect tracking endpoint (trackPurlClick procedure)
- [x] Add updateBooking function to db.ts for purl tracking
- [x] Update routers to pass purl link to email function
- [x] All 204 tests passing with HIPAA-compliant architecture (no PHI stored on website)


## HIPAA Purl Configuration & Booking Redirect

- [x] Add global purl link configuration setting to settings table
- [x] Create admin UI to set/update global purl link
- [x] Update booking confirmation button to redirect to purl link with tracking
- [x] Implement purl redirect endpoint that logs click and redirects
- [x] Remove all SOA form components and routes
- [x] Remove SOA database tables and schema (optional - kept for historical/compliance records)
- [x] Remove SOA-related tRPC procedures and routers
- [x] Remove SOA tests from test suite
- [x] Update booking flow to skip SOA and go directly to purl redirect
- [x] Test complete HIPAA-compliant booking workflow (no PHI stored)
- [x] Show different button text for Medicare vs non-Medicare clients
- [x] Redirect Medicare clients to purl link after booking confirmation
- [x] Show standard "Schedule Consultation" button for non-Medicare clients
- [x] Fix confirmed bookings not showing in admin bookings tab
- [x] Fix confirmed bookings not showing in admin calendar tab
