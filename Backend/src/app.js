const express = require("express");
const session = require("express-session");
const passport = require("./services/passport-config");
const cors = require("cors");
const dbconnect = require('./database/database');
const moment = require('moment-timezone');
const bodyParser = require('body-parser');

require('./services/cronService');

const authRoutes = require("./routes/authRoutes");
const shareRoutes = require("./routes/shareRoutes");
const monthlyFeesRoutes = require("./routes/monthlyFee");
const monthlyPlansRoutes = require("./routes/monthlyPlan");
const muscleGroupsRoutes = require("./routes/muscleGroup");
const paymentRecordsRoutes = require("./routes/paymentRecord");
const progressRoutes = require("./routes/progress");
const rolesRoutes = require("./routes/role");
const routinesRoutes = require("./routes/routine");
const usersRoutes = require("./routes/user");
const loginRoute = require("./routes/login");
const adsRoutes = require("./routes/ad");
const attendanceRecordsRoutes = require("./routes/attendanceRecord");
const classesRoutes = require("./routes/class");
const eventsRoutes = require("./routes/event");
const coachesRoutes = require("./routes/coach");
const exercisesRoutes = require("./routes/exercise");
const feedbacksRoutes = require("./routes/feedback");
const membersRoutes = require("./routes/member");
const paymentRoutes = require('./routes/paymentRoutes');

// Usa las rutas de pago

const app = express();

app.use(session({
  secret: 'maxipro328',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors({origin: 'http://localhost:4200'}));



// Establecer la zona horaria deseada
moment.tz.setDefault('America/Argentina/Buenos_Aires');

//ROUTES
app.use('/monthlyFees', monthlyFeesRoutes);
app.use('/monthlyPlans', monthlyPlansRoutes);
app.use('/muscleGroups', muscleGroupsRoutes);
app.use('/paymentRecords', paymentRecordsRoutes);
app.use('/progress', progressRoutes);
app.use('/roles', rolesRoutes);
app.use('/routines', routinesRoutes);
app.use('/users', usersRoutes);
app.use('/login', loginRoute);
app.use('/ads', adsRoutes);
app.use('/attendanceRecords', attendanceRecordsRoutes);
app.use('/classes', classesRoutes);
app.use('/events', eventsRoutes);
app.use('/coaches', coachesRoutes);
app.use('/exercises', exercisesRoutes);
app.use('/feedbacks', feedbacksRoutes);
app.use('/members', membersRoutes);
app.use('/auth', authRoutes);
app.use('/share', shareRoutes);
app.use('/api/payments', paymentRoutes);

app.listen(PORT, () => {
  console.log(`[server]: running on port: http://localhost:${PORT}`);
})

dbconnect();