<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = Classroom::pluck('id', 'name');

        $students = [
            [
                'name' => 'Aung Kaung Htet',
                'email' => 'aungkaunghtet@gmail.com',
                'phone' => '09785012341',
                'classroom_id' => $classrooms['Grade 1 - A'],
            ],
            [
                'name' => 'Su Myat Thu',
                'email' => 'sumyatthu@gmail.com',
                'phone' => '09892145673',
                'classroom_id' => $classrooms['Grade 1 - A'],
            ],
            [
                'name' => 'Htet Naing Lin',
                'email' => 'htetnainglin@gmail.com',
                'phone' => '09792134856',
                'classroom_id' => $classrooms['Grade 1 - B'],
            ],
            [
                'name' => 'Thiri Mon',
                'email' => 'thirimon@gmail.com',
                'phone' => '09976541238',
                'classroom_id' => $classrooms['Grade 1 - B'],
            ],
            [
                'name' => 'Min Khant Zaw',
                'email' => 'minkhantzaw@gmail.com',
                'phone' => '09783451269',
                'classroom_id' => $classrooms['Grade 2 - A'],
            ],
            [
                'name' => 'Ei Ei Phyo',
                'email' => 'eieiphyo@gmail.com',
                'phone' => '09876512340',
                'classroom_id' => $classrooms['Grade 2 - A'],
            ],
            [
                'name' => 'Kaung Myat Htun',
                'email' => 'kaungmyathtun@gmail.com',
                'phone' => '09781234567',
                'classroom_id' => $classrooms['Grade 2 - B'],
            ],
            [
                'name' => 'May Thazin Oo',
                'email' => 'maythazinoo@gmail.com',
                'phone' => '09912345678',
                'classroom_id' => $classrooms['Grade 2 - B'],
            ],
            [
                'name' => 'Kyaw Zin Htet',
                'email' => 'kyawzinhtet@gmail.com',
                'phone' => '09785678901',
                'classroom_id' => $classrooms['Grade 3 - A'],
            ],
            [
                'name' => 'Khin Pwint Phyu',
                'email' => 'khinpwintphyu@gmail.com',
                'phone' => '09876543219',
                'classroom_id' => $classrooms['Grade 3 - A'],
            ],
            [
                'name' => 'Pyae Phyo Aung',
                'email' => 'pyaephyoaung@gmail.com',
                'phone' => '09781239876',
                'classroom_id' => $classrooms['Grade 3 - B'],
            ],
            [
                'name' => 'Nandar Hlaing',
                'email' => 'nandarhlaing@gmail.com',
                'phone' => '09987654321',
                'classroom_id' => $classrooms['Grade 3 - B'],
            ],
            [
                'name' => 'Thaw Zin Oo',
                'email' => 'thawzinoo@gmail.com',
                'phone' => '09785634129',
                'classroom_id' => $classrooms['Grade 4 - A'],
            ],
            [
                'name' => 'Wai Yan Kyaw',
                'email' => 'waiyankyaw@gmail.com',
                'phone' => '09812345679',
                'classroom_id' => $classrooms['Grade 4 - A'],
            ],
            [
                'name' => 'Su Hnin Wai',
                'email' => 'suhninwai@gmail.com',
                'phone' => '09976543821',
                'classroom_id' => $classrooms['Grade 4 - B'],
            ],
            [
                'name' => 'Zin Min Htet',
                'email' => 'zinminhtet@gmail.com',
                'phone' => '09783456712',
                'classroom_id' => $classrooms['Grade 4 - B'],
            ],
            [
                'name' => 'Htet Htet Win',
                'email' => 'htethtetwin@gmail.com',
                'phone' => '09891234567',
                'classroom_id' => $classrooms['Grade 5 - A'],
            ],
            [
                'name' => 'Aung Pyae Sone',
                'email' => 'aungpyaesone@gmail.com',
                'phone' => '09784561230',
                'classroom_id' => $classrooms['Grade 5 - A'],
            ],
            [
                'name' => 'Yadanar Myint',
                'email' => 'yadanarmyint@gmail.com',
                'phone' => '09981236745',
                'classroom_id' => $classrooms['Grade 5 - B'],
            ],
            [
                'name' => 'Hein Htet Aung',
                'email' => 'heinhtetaung@gmail.com',
                'phone' => '09785671234',
                'classroom_id' => $classrooms['Grade 5 - B'],
            ],
        ];

        foreach ($students as $student) {
            Student::create($student);
        }
    }
}
