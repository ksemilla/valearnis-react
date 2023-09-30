import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom"
import {
  HomePage,
  AdminLessonList,
  LessonDetail,
  LoginPage,
  MyAccount,
  QuizAnswerDetail,
  QuizAnswerList,
  SignupPage,
  UserDetail,
  UserList,
  AdminLessonEdit,
  AdminLessonCreate,
  AdminQuizCreate,
  AdminQuizDetail,
  AdminQuizList,
  QuizDetail,
} from "./views"
import AuthContainer from "./containers/AuthContainer"
import BaseContainer from "./containers/BaseContainer"
import AdminContainer from "./containers/AdminContainer"
import AdminQuizzesContainer from "./containers/AdminQuizzesContainer"
import ApiTesting from "./views/api-testing"

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<AuthContainer />}>
        <Route element={<BaseContainer />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/:slug" element={<LessonDetail />} />
          <Route path="/:slug/:id" element={<QuizDetail />} />
          <Route path="quiz-results" element={<QuizAnswerList />} />
          <Route path="quiz-results/:id" element={<QuizAnswerDetail />} />
        </Route>
        <Route element={<AdminContainer />}>
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/users/:id" element={<UserDetail />} />
          <Route path="/admin/lessons" element={<AdminLessonList />} />
          <Route path="/admin/lessons/create" element={<AdminLessonCreate />} />

          <Route
            path="/admin/lessons/:slug"
            element={<AdminQuizzesContainer />}
          >
            <Route path="" element={<AdminLessonEdit />} />
            <Route path="quizzes" element={<AdminQuizList />} />
            <Route path="quizzes/create" element={<AdminQuizCreate />} />
            <Route path="quizzes/:id" element={<AdminQuizDetail />} />
          </Route>
        </Route>
      </Route>
      <Route path="/api-testing" element={<ApiTesting />} />
    </Route>
  )
)

export default router
