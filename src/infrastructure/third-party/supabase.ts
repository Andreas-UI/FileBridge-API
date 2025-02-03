import { createClient } from "@supabase/supabase-js";
import { Database } from "../../../database.types";

const supabaseUrl = process.env.SUPABASE_PROJECT_URL!;
const supabaseKey = process.env.SUPABASE_SECRET_ROLE!;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);
