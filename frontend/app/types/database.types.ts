export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      application_documents: {
        Row: {
          application_id: number
          created_at: string
          file_name: string
          file_path: string
          file_size: number | null
          id: number
          mime_type: string | null
          requirement_id: number | null
          uploaded_by: string
          verification_note: string | null
          verified_by: string | null
        }
        Insert: {
          application_id: number
          created_at?: string
          file_name: string
          file_path: string
          file_size?: number | null
          id?: never
          mime_type?: string | null
          requirement_id?: number | null
          uploaded_by: string
          verification_note?: string | null
          verified_by?: string | null
        }
        Update: {
          application_id?: number
          created_at?: string
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: never
          mime_type?: string | null
          requirement_id?: number | null
          uploaded_by?: string
          verification_note?: string | null
          verified_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "application_documents_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "application_documents_requirement_id_fkey"
            columns: ["requirement_id"]
            isOneToOne: false
            referencedRelation: "tier_requirements"
            referencedColumns: ["id"]
          },
        ]
      }
      application_extracurriculars: {
        Row: {
          achievement: string | null
          activity_name: string
          application_id: number
          created_at: string
          description: string | null
          end_date: string | null
          id: number
          level: string | null
          organization_name: string | null
          role_name: string | null
          start_date: string | null
          updated_at: string
        }
        Insert: {
          achievement?: string | null
          activity_name: string
          application_id: number
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: never
          level?: string | null
          organization_name?: string | null
          role_name?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Update: {
          achievement?: string | null
          activity_name?: string
          application_id?: number
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: never
          level?: string | null
          organization_name?: string | null
          role_name?: string | null
          start_date?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_extracurriculars_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          application_no: string
          created_at: string
          decision_note: string | null
          final_decision_at: string | null
          id: number
          scholarship_type_id: number
          student_id: string
          submitted_at: string | null
          tier_id: number
          updated_at: string
        }
        Insert: {
          application_no: string
          created_at?: string
          decision_note?: string | null
          final_decision_at?: string | null
          id?: never
          scholarship_type_id: number
          student_id: string
          submitted_at?: string | null
          tier_id: number
          updated_at?: string
        }
        Update: {
          application_no?: string
          created_at?: string
          decision_note?: string | null
          final_decision_at?: string | null
          id?: never
          scholarship_type_id?: number
          student_id?: string
          submitted_at?: string | null
          tier_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "applications_scholarship_type_id_fkey"
            columns: ["scholarship_type_id"]
            isOneToOne: false
            referencedRelation: "scholarship_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "scholarship_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
      organizers: {
        Row: {
          created_at: string
          description: string | null
          email: string | null
          id: number
          is_active: boolean
          logo_url: string | null
          name: string
          phone: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          email?: string | null
          id?: never
          is_active?: boolean
          logo_url?: string | null
          name: string
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          email?: string | null
          id?: never
          is_active?: boolean
          logo_url?: string | null
          name?: string
          phone?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string
          contact_info:
            | Database["public"]["CompositeTypes"]["profile_contact_type"][]
            | null
          created_at: string
          email: string | null
          id: string
          role: Database["public"]["Enums"]["profile_role"] | null
          username: string | null
        }
        Insert: {
          avatar_url?: string
          contact_info?:
            | Database["public"]["CompositeTypes"]["profile_contact_type"][]
            | null
          created_at?: string
          email?: string | null
          id: string
          role?: Database["public"]["Enums"]["profile_role"] | null
          username?: string | null
        }
        Update: {
          avatar_url?: string
          contact_info?:
            | Database["public"]["CompositeTypes"]["profile_contact_type"][]
            | null
          created_at?: string
          email?: string | null
          id?: string
          role?: Database["public"]["Enums"]["profile_role"] | null
          username?: string | null
        }
        Relationships: []
      }
      scholarship_tiers: {
        Row: {
          code: string
          created_at: string
          display_order: number
          id: number
          internal_amount_money: number | null
          is_active: boolean
          scholarship_type_id: number
          short_description: string | null
          symbolic_name: string
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          display_order?: number
          id?: never
          internal_amount_money?: number | null
          is_active?: boolean
          scholarship_type_id: number
          short_description?: string | null
          symbolic_name: string
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          display_order?: number
          id?: never
          internal_amount_money?: number | null
          is_active?: boolean
          scholarship_type_id?: number
          short_description?: string | null
          symbolic_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_tiers_scholarship_type_id_fkey"
            columns: ["scholarship_type_id"]
            isOneToOne: false
            referencedRelation: "scholarship_types"
            referencedColumns: ["id"]
          },
        ]
      }
      scholarship_types: {
        Row: {
          academic_year: string | null
          close_at: string | null
          code: string
          created_at: string
          description: string | null
          id: number
          is_active: boolean
          name: string
          open_at: string | null
          organizer_id: number
          updated_at: string
        }
        Insert: {
          academic_year?: string | null
          close_at?: string | null
          code: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          name: string
          open_at?: string | null
          organizer_id: number
          updated_at?: string
        }
        Update: {
          academic_year?: string | null
          close_at?: string | null
          code?: string
          created_at?: string
          description?: string | null
          id?: never
          is_active?: boolean
          name?: string
          open_at?: string | null
          organizer_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "scholarship_types_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "organizers"
            referencedColumns: ["id"]
          },
        ]
      }
      students: {
        Row: {
          dob: string | null
          full_name: string | null
          gender: Database["public"]["Enums"]["student_gender"] | null
          id: string
          residence:
            | Database["public"]["CompositeTypes"]["student_residence_type"]
            | null
        }
        Insert: {
          dob?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["student_gender"] | null
          id: string
          residence?:
            | Database["public"]["CompositeTypes"]["student_residence_type"]
            | null
        }
        Update: {
          dob?: string | null
          full_name?: string | null
          gender?: Database["public"]["Enums"]["student_gender"] | null
          id?: string
          residence?:
            | Database["public"]["CompositeTypes"]["student_residence_type"]
            | null
        }
        Relationships: [
          {
            foreignKeyName: "students_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tier_requirements: {
        Row: {
          description: string | null
          id: number
          is_required: boolean
          label: string
          requirement_code: string
          sort_order: number
          tier_id: number
        }
        Insert: {
          description?: string | null
          id?: never
          is_required?: boolean
          label: string
          requirement_code: string
          sort_order?: number
          tier_id: number
        }
        Update: {
          description?: string | null
          id?: never
          is_required?: boolean
          label?: string
          requirement_code?: string
          sort_order?: number
          tier_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "tier_requirements_tier_id_fkey"
            columns: ["tier_id"]
            isOneToOne: false
            referencedRelation: "scholarship_tiers"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      profile_contact_enum: "PHONE" | "EMAIL"
      profile_role: "STUDENT" | "ADMIN" | "ORGANIZER"
      scholarship_tier: "GOLD" | "SILVER" | "VENUE"
      student_gender: "MALE" | "FEMALE" | "OTHER"
    }
    CompositeTypes: {
      profile_contact_type: {
        type: Database["public"]["Enums"]["profile_contact_enum"] | null
        value: string | null
      }
      student_residence_type: {
        province: string | null
        district: string | null
        detail: string | null
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      profile_contact_enum: ["PHONE", "EMAIL"],
      profile_role: ["STUDENT", "ADMIN", "ORGANIZER"],
      scholarship_tier: ["GOLD", "SILVER", "VENUE"],
      student_gender: ["MALE", "FEMALE", "OTHER"],
    },
  },
} as const
