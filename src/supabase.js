// src/supabase.js
import { createClient } from "@supabase/supabase-js";

// 请确保只在客户端使用 anon key，不要将 service_role 密钥暴露到前端！
const supabaseUrl = "https://oimtvnybrlwmqgsixklj.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9pbXR2bnlicmx3bXFnc2l4a2xqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxNjQ0NzcsImV4cCI6MjA1ODc0MDQ3N30.9NE8K6KTTmdPhuVUlf4ukTfNrGGS2F0jbFAjI6JF3yA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
