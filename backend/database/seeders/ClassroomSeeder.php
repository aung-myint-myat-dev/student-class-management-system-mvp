<?php

namespace Database\Seeders;

use App\Models\Classroom;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ClassroomSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = [
            ['name' => 'Grade 1 - A'],
            ['name' => 'Grade 1 - B'],
            ['name' => 'Grade 2 - A'],
            ['name' => 'Grade 2 - B'],
            ['name' => 'Grade 3 - A'],
            ['name' => 'Grade 3 - B'],
            ['name' => 'Grade 4 - A'],
            ['name' => 'Grade 4 - B'],
            ['name' => 'Grade 5 - A'],
            ['name' => 'Grade 5 - B'],
        ];

        foreach ($classrooms as $classroom) {
            Classroom::create($classroom);
        }
    }
}
