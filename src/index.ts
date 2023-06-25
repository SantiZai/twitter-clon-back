import app from './app'
import { PORT, DB_HOST } from './config'

app.listen(PORT, () => console.log(`Server on http://${DB_HOST}:${PORT}/api/`))