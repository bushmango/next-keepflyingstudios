import { createClient } from '@supabase/supabase-js'

require('dotenv').config()

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseAnonKey = process.env.SUPABASE_KEY || ''

console.log('env is', supabaseUrl, supabaseAnonKey)
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)
