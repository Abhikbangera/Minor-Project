# OTP Email Verification Implementation TODO

## Plan Status: Approved ✅

**Breakdown into logical steps:**

### 1. **Backend Setup** ✅
   - ✅ Created `backend/package.json` with Express, Nodemailer, etc.
   - ✅ Created `backend/server.js` with /api/send-otp and /api/verify-otp endpoints.
   - ✅ Created `backend/.env.example` for SMTP config.

### 2. **Frontend API Service** ✅
   - ✅ Created `src/services/api.js` with sendOtp() and verifyOtp() functions.

### 3. **Update StudentSignup.jsx** ✅
   - ✅ Multi-step form: email → OTP → full form.
   - ✅ Integrate API calls, loading states, error handling.

### 4. **Update TeacherSignup.jsx** ✅
   - ✅ Mirror StudentSignup changes for teacher flow.

### 5. **Testing & Setup** ✅
   - ✅ `cd backend && npm install`
   - ✅ Setup `backend/.env` with Gmail app password
   - ✅ `cd backend && node server.js`
   - ✅ Frontend: `npm run dev`
   - ✅ Test full flow on StudentSignup/TeacherSignup

**Next Action:** Updating TeacherSignup.jsx...

*Updated: 3/5 steps completed*



