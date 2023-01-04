import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://mtjndkveaifcsfkhxemu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10am5ka3ZlYWlmY3Nma2h4ZW11Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjYwODQ0OTEsImV4cCI6MTk4MTY2MDQ5MX0.vRIzdy2mYCfLdXXIpAbkfzBGR063ToXTTEpFZ4bRxqw"
)
