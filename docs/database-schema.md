# Database Schema Documentation

This document describes the PostgreSQL database schema for the Mess Management System managed via Supabase migrations.

## Entity Relationship Summary

```
                      +-------------------+
                      |      Hostels      |
                      +---------+---------+
                                | 1
                                |
             +------------------+------------------+
             | *                                   | *
     +-------+-------+                     +-------+-------+
     |   Profiles    |                     |  Food Menus   |
     +-------+-------+                     +---------------+
             | 1
   +---------+---------+-------------------+-------------------+
   | *                 | *                 | *                 | *
+--+-----------+    +--+----------+     +--+-----------+    +--+-----------+
| Attendance   |    | Feedback    |     | Complaints   |    | Notifications|
+--------------+    +-------------+     +--------------+    +--------------+
```

## Tables Reference

### 1. `profiles`
Extends default Supabase `auth.users` with student/staff metadata and role privileges.
- `id` (UUID, Primary Key, Foreign Key -> `auth.users.id`)
- `email` (TEXT, Unique)
- `full_name` (TEXT)
- `roll_number` (TEXT, Unique)
- `phone_number` (TEXT)
- `role` (ENUM: `student`, `mess_admin`, `super_admin`)
- `hostel_id` (UUID, Foreign Key -> `hostels.id`)
- `room_number` (TEXT)
- `avatar_url` (TEXT)

### 2. `hostels`
Hostel blocks and dining hall parameters.
- `id` (UUID, Primary Key)
- `name` (TEXT, Unique)
- `code` (TEXT, Unique)
- `capacity` (INT)
- `mess_capacity` (INT)

### 3. `food_menus`
Scheduled meal menus for specific days and meal slots.
- `id` (UUID, Primary Key)
- `hostel_id` (UUID, Foreign Key -> `hostels.id`)
- `day_of_week` (INT: 0 to 6)
- `meal` (ENUM: `breakfast`, `lunch`, `snacks`, `dinner`)
- `items` (JSONB)
- `calories` (INT)
- `dietary_tags` (TEXT[])

### 4. `attendance`
Scanned meal attendance logs.
- `id` (UUID, Primary Key)
- `student_id` (UUID, Foreign Key -> `profiles.id`)
- `hostel_id` (UUID, Foreign Key -> `hostels.id`)
- `date` (DATE)
- `meal` (ENUM)
- `scanned_at` (TIMESTAMP)
- `verification_token` (TEXT)

### 5. `feedback`
Student meal ratings and review comments.
- `rating` (INT 1-5)
- `sentiment` (TEXT: `positive`, `neutral`, `negative`)
- `image_url` (TEXT)

### 6. `complaints`
Grievances logged by students for mess staff action.
- `category` (ENUM: `food_quality`, `hygiene`, `staff_behavior`, `amenities`, `other`)
- `status` (ENUM: `pending`, `in_progress`, `resolved`, `rejected`)
- `admin_response` (TEXT)
