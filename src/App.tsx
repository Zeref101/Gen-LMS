import MarkdownNotes from "./components/MarkdownNotes";
import TextSelect from "./components/TextSelect";

const App = () => {
  const markdown = `
  # Eldafriend-backend

- Backend for Eldafriend app, A pal for the elder community! Track your medication, along with reminders and many showstopper features that ensure completely homely care.

End-Points:

- [User Authentication endpoints](#auth)
- [Medicine endpoints](#meds)
- [Community endpoints](#community)
- [Expense endpoints](#expense)
- [User functionalities](#user)

To install dependencies:

\`\`\`bash
bun install
\`\`\`

To run:

\`\`\`bash
bun run dev
\`\`\`

### <a id="auth" ></a>User Authentication

### GET /api/auth

**Returns a greeting message.**

### POST /api/auth/sign-up/getOtp

**Creates a new user and sends an OTP to their email.**

#### Headers:

- Content-Type: application/json

#### Request Body:

\`\`\`json
{
  "fullname": "John Doe",
  "email": "johndoe@example.com",
  "phone": "+1234567890",
  "password": "password123"
}
\`\`\`



  `;

  return (
    <div>
      <TextSelect>
        <MarkdownNotes markdown={markdown.toString()} />
      </TextSelect>
    </div>
  )
}

export default App