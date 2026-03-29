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
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      about_content: {
        Row: {
          content: string | null
          id: string
          metadata: Json | null
          section_key: string
          title: string | null
          updated_at: string | null
        }
        Insert: {
          content?: string | null
          id?: string
          metadata?: Json | null
          section_key: string
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          content?: string | null
          id?: string
          metadata?: Json | null
          section_key?: string
          title?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author: string | null
          category: string | null
          content: string | null
          cover_image: string | null
          created_at: string | null
          excerpt: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string | null
          category?: string | null
          content?: string | null
          cover_image?: string | null
          created_at?: string | null
          excerpt?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      catalogue_categories: {
        Row: {
          created_at: string | null
          id: string
          name: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      catalogues: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          download_count: number | null
          file_size: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          pdf_url: string | null
          slug: string
          sort_order: number | null
          tag: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: string
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_size?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          pdf_url?: string | null
          slug: string
          sort_order?: number | null
          tag?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_size?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          pdf_url?: string | null
          slug?: string
          sort_order?: number | null
          tag?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      design_idea_categories: {
        Row: {
          cover_image: string | null
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          is_published: boolean | null
          meta_description: string | null
          meta_title: string | null
          name: string
          seo_content: string | null
          slug: string
          sort_order: number | null
          updated_at: string | null
        }
        Insert: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          name: string
          seo_content?: string | null
          slug: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Update: {
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          is_published?: boolean | null
          meta_description?: string | null
          meta_title?: string | null
          name?: string
          seo_content?: string | null
          slug?: string
          sort_order?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      design_ideas: {
        Row: {
          backsplash: string | null
          category_id: string
          colours: Json | null
          countertop_material: string | null
          created_at: string | null
          description: string | null
          focus_keyword: string | null
          id: string
          ideal_for: string | null
          images: Json | null
          is_published: boolean | null
          is_trending: boolean | null
          layout: string | null
          meta_description: string | null
          meta_title: string | null
          room_dimension: string | null
          short_description: string | null
          shutter_finish: Json | null
          slug: string
          sort_order: number | null
          special_features: string | null
          storage_features: string | null
          style: string | null
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          backsplash?: string | null
          category_id: string
          colours?: Json | null
          countertop_material?: string | null
          created_at?: string | null
          description?: string | null
          focus_keyword?: string | null
          id?: string
          ideal_for?: string | null
          images?: Json | null
          is_published?: boolean | null
          is_trending?: boolean | null
          layout?: string | null
          meta_description?: string | null
          meta_title?: string | null
          room_dimension?: string | null
          short_description?: string | null
          shutter_finish?: Json | null
          slug: string
          sort_order?: number | null
          special_features?: string | null
          storage_features?: string | null
          style?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          backsplash?: string | null
          category_id?: string
          colours?: Json | null
          countertop_material?: string | null
          created_at?: string | null
          description?: string | null
          focus_keyword?: string | null
          id?: string
          ideal_for?: string | null
          images?: Json | null
          is_published?: boolean | null
          is_trending?: boolean | null
          layout?: string | null
          meta_description?: string | null
          meta_title?: string | null
          room_dimension?: string | null
          short_description?: string | null
          shutter_finish?: Json | null
          slug?: string
          sort_order?: number | null
          special_features?: string | null
          storage_features?: string | null
          style?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "design_ideas_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "design_idea_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          message: string | null
          name: string
          phone: string | null
          preferred_date: string | null
          project_reference: string | null
          source: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          preferred_date?: string | null
          project_reference?: string | null
          source?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          preferred_date?: string | null
          project_reference?: string | null
          source?: string | null
          status?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          badge: string | null
          brand: string | null
          brochure_url: string | null
          category: string | null
          color: string | null
          created_at: string | null
          delivery_time: string | null
          description: string | null
          dimensions: string | null
          focus_keyword: string | null
          id: string
          images: Json | null
          in_stock: boolean | null
          interior_tags: string[] | null
          is_bestseller: boolean | null
          is_featured: boolean | null
          is_new: boolean | null
          is_published: boolean | null
          low_stock_alert: number | null
          material: string | null
          meta_description: string | null
          meta_title: string | null
          model: string | null
          name: string
          original_price: number | null
          price: number
          product_type: string | null
          rating: number | null
          return_policy: string | null
          review_count: number | null
          shipping_weight: string | null
          short_description: string | null
          sku: string | null
          slug: string
          sort_order: number | null
          specifications: Json | null
          status: string | null
          stock_quantity: number | null
          style: string | null
          subcategory: string | null
          updated_at: string | null
          video_url: string | null
          warehouse_location: string | null
          warranty: string | null
          weight: string | null
        }
        Insert: {
          badge?: string | null
          brand?: string | null
          brochure_url?: string | null
          category?: string | null
          color?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          dimensions?: string | null
          focus_keyword?: string | null
          id?: string
          images?: Json | null
          in_stock?: boolean | null
          interior_tags?: string[] | null
          is_bestseller?: boolean | null
          is_featured?: boolean | null
          is_new?: boolean | null
          is_published?: boolean | null
          low_stock_alert?: number | null
          material?: string | null
          meta_description?: string | null
          meta_title?: string | null
          model?: string | null
          name: string
          original_price?: number | null
          price?: number
          product_type?: string | null
          rating?: number | null
          return_policy?: string | null
          review_count?: number | null
          shipping_weight?: string | null
          short_description?: string | null
          sku?: string | null
          slug: string
          sort_order?: number | null
          specifications?: Json | null
          status?: string | null
          stock_quantity?: number | null
          style?: string | null
          subcategory?: string | null
          updated_at?: string | null
          video_url?: string | null
          warehouse_location?: string | null
          warranty?: string | null
          weight?: string | null
        }
        Update: {
          badge?: string | null
          brand?: string | null
          brochure_url?: string | null
          category?: string | null
          color?: string | null
          created_at?: string | null
          delivery_time?: string | null
          description?: string | null
          dimensions?: string | null
          focus_keyword?: string | null
          id?: string
          images?: Json | null
          in_stock?: boolean | null
          interior_tags?: string[] | null
          is_bestseller?: boolean | null
          is_featured?: boolean | null
          is_new?: boolean | null
          is_published?: boolean | null
          low_stock_alert?: number | null
          material?: string | null
          meta_description?: string | null
          meta_title?: string | null
          model?: string | null
          name?: string
          original_price?: number | null
          price?: number
          product_type?: string | null
          rating?: number | null
          return_policy?: string | null
          review_count?: number | null
          shipping_weight?: string | null
          short_description?: string | null
          sku?: string | null
          slug?: string
          sort_order?: number | null
          specifications?: Json | null
          status?: string | null
          stock_quantity?: number | null
          style?: string | null
          subcategory?: string | null
          updated_at?: string | null
          video_url?: string | null
          warehouse_location?: string | null
          warranty?: string | null
          weight?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          address: string | null
          area: string | null
          before_after: Json | null
          completion_year: string | null
          created_at: string | null
          description: string | null
          gallery: Json | null
          hero_image: string | null
          id: string
          is_published: boolean | null
          keywords: string[] | null
          location: string | null
          map_embed: string | null
          materials: Json | null
          meta_description: string | null
          meta_title: string | null
          overview: string | null
          slug: string
          sort_order: number | null
          tagline: string | null
          testimonial: Json | null
          timeline: Json | null
          title: string
          type: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          address?: string | null
          area?: string | null
          before_after?: Json | null
          completion_year?: string | null
          created_at?: string | null
          description?: string | null
          gallery?: Json | null
          hero_image?: string | null
          id?: string
          is_published?: boolean | null
          keywords?: string[] | null
          location?: string | null
          map_embed?: string | null
          materials?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          overview?: string | null
          slug: string
          sort_order?: number | null
          tagline?: string | null
          testimonial?: Json | null
          timeline?: Json | null
          title: string
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          address?: string | null
          area?: string | null
          before_after?: Json | null
          completion_year?: string | null
          created_at?: string | null
          description?: string | null
          gallery?: Json | null
          hero_image?: string | null
          id?: string
          is_published?: boolean | null
          keywords?: string[] | null
          location?: string | null
          map_embed?: string | null
          materials?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          overview?: string | null
          slug?: string
          sort_order?: number | null
          tagline?: string | null
          testimonial?: Json | null
          timeline?: Json | null
          title?: string
          type?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
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
      app_role: ["admin", "user"],
    },
  },
} as const
