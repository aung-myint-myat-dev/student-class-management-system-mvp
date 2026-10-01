<?php

namespace Database\Seeders;

use App\Models\Classroom;
use App\Models\Student;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $classrooms = Classroom::pluck('id', 'name');

        // $students = [
        //     [
        //         'name' => 'Aung Kaung Htet',
        //         'student_code' => 'STU-00001',
        //         'email' => 'aungkaunghtet@gmail.com',
        //         'phone' => '09785012341',
        //         'classroom_id' => $classrooms['Grade 1 - A'],
        //     ],
        //     [
        //         'name' => 'Su Myat Thu',
        //         'student_code' => 'STU-00002',
        //         'email' => 'sumyatthu@gmail.com',
        //         'phone' => '09892145673',
        //         'classroom_id' => $classrooms['Grade 1 - A'],
        //     ],
        //     [
        //         'name' => 'Htet Naing Lin',
        //         'student_code' => 'STU-00003',
        //         'email' => 'htetnainglin@gmail.com',
        //         'phone' => '09792134856',
        //         'classroom_id' => $classrooms['Grade 1 - B'],
        //     ],
        //     [
        //         'name' => 'Thiri Mon',
        //         'email' => 'thirimon@gmail.com',
        //         'phone' => '09976541238',
        //         'classroom_id' => $classrooms['Grade 1 - B'],
        //     ],
        //     [
        //         'name' => 'Min Khant Zaw',
        //         'email' => 'minkhantzaw@gmail.com',
        //         'phone' => '09783451269',
        //         'classroom_id' => $classrooms['Grade 2 - A'],
        //     ],
        //     [
        //         'name' => 'Ei Ei Phyo',
        //         'email' => 'eieiphyo@gmail.com',
        //         'phone' => '09876512340',
        //         'classroom_id' => $classrooms['Grade 2 - A'],
        //     ],
        //     [
        //         'name' => 'Kaung Myat Htun',
        //         'email' => 'kaungmyathtun@gmail.com',
        //         'phone' => '09781234567',
        //         'classroom_id' => $classrooms['Grade 2 - B'],
        //     ],
        //     [
        //         'name' => 'May Thazin Oo',
        //         'email' => 'maythazinoo@gmail.com',
        //         'phone' => '09912345678',
        //         'classroom_id' => $classrooms['Grade 2 - B'],
        //     ],
        //     [
        //         'name' => 'Kyaw Zin Htet',
        //         'email' => 'kyawzinhtet@gmail.com',
        //         'phone' => '09785678901',
        //         'classroom_id' => $classrooms['Grade 3 - A'],
        //     ],
        //     [
        //         'name' => 'Khin Pwint Phyu',
        //         'email' => 'khinpwintphyu@gmail.com',
        //         'phone' => '09876543219',
        //         'classroom_id' => $classrooms['Grade 3 - A'],
        //     ],
        //     [
        //         'name' => 'Pyae Phyo Aung',
        //         'email' => 'pyaephyoaung@gmail.com',
        //         'phone' => '09781239876',
        //         'classroom_id' => $classrooms['Grade 3 - B'],
        //     ],
        //     [
        //         'name' => 'Nandar Hlaing',
        //         'email' => 'nandarhlaing@gmail.com',
        //         'phone' => '09987654321',
        //         'classroom_id' => $classrooms['Grade 3 - B'],
        //     ],
        //     [
        //         'name' => 'Thaw Zin Oo',
        //         'email' => 'thawzinoo@gmail.com',
        //         'phone' => '09785634129',
        //         'classroom_id' => $classrooms['Grade 4 - A'],
        //     ],
        //     [
        //         'name' => 'Wai Yan Kyaw',
        //         'email' => 'waiyankyaw@gmail.com',
        //         'phone' => '09812345679',
        //         'classroom_id' => $classrooms['Grade 4 - A'],
        //     ],
        //     [
        //         'name' => 'Su Hnin Wai',
        //         'email' => 'suhninwai@gmail.com',
        //         'phone' => '09976543821',
        //         'classroom_id' => $classrooms['Grade 4 - B'],
        //     ],
        //     [
        //         'name' => 'Zin Min Htet',
        //         'email' => 'zinminhtet@gmail.com',
        //         'phone' => '09783456712',
        //         'classroom_id' => $classrooms['Grade 4 - B'],
        //     ],
        //     [
        //         'name' => 'Htet Htet Win',
        //         'email' => 'htethtetwin@gmail.com',
        //         'phone' => '09891234567',
        //         'classroom_id' => $classrooms['Grade 5 - A'],
        //     ],
        //     [
        //         'name' => 'Aung Pyae Sone',
        //         'email' => 'aungpyaesone@gmail.com',
        //         'phone' => '09784561230',
        //         'classroom_id' => $classrooms['Grade 5 - A'],
        //     ],
        //     [
        //         'name' => 'Yadanar Myint',
        //         'email' => 'yadanarmyint@gmail.com',
        //         'phone' => '09981236745',
        //         'classroom_id' => $classrooms['Grade 5 - B'],
        //     ],
        //     [
        //         'name' => 'Hein Htet Aung',
        //         'email' => 'heinhtetaung@gmail.com',
        //         'phone' => '09785671234',
        //         'classroom_id' => $classrooms['Grade 5 - B'],
        //     ],
        // ];

        $students = [
            [
                'name' => 'Aung Myint Zaw',
                'father_name' => 'Father name',
                'student_code' => 'STU-00001',
                'email' => 'aungmyintzaw@gmail.com',
                'phone' => '09792134801',
                'classroom_id' => $classrooms['Grade 1 - A'],
            ],
            [
                'name' => 'Htet Naing Lin',
                'father_name' => 'Father name',
                'student_code' => 'STU-00002',
                'email' => 'htetnainglin@gmail.com',
                'phone' => '09792134856',
                'classroom_id' => $classrooms['Grade 1 - B'],
            ],
            [
                'name' => 'Kyaw Zin Htet',
                'father_name' => 'Father name',
                'student_code' => 'STU-00003',
                'email' => 'kyawzinhtet@gmail.com',
                'phone' => '09792134857',
                'classroom_id' => $classrooms['Grade 2 - A'],
            ],
            [
                'name' => 'Min Thant Zaw',
                'father_name' => 'Father name',
                'student_code' => 'STU-00004',
                'email' => 'minthantzaw@gmail.com',
                'phone' => '09792134858',
                'classroom_id' => $classrooms['Grade 2 - B'],
            ],
            [
                'name' => 'Aung Khant Myat',
                'father_name' => 'Father name',
                'student_code' => 'STU-00005',
                'email' => 'aungkhantmyat@gmail.com',
                'phone' => '09792134859',
                'classroom_id' => $classrooms['Grade 3 - A'],
            ],
            [
                'name' => 'Kaung Htet Min',
                'father_name' => 'Father name',
                'student_code' => 'STU-00006',
                'email' => 'kaunghtetmin@gmail.com',
                'phone' => '09792134860',
                'classroom_id' => $classrooms['Grade 3 - B'],
            ],
            [
                'name' => 'Thant Zin Aung',
                'father_name' => 'Father name',
                'student_code' => 'STU-00007',
                'email' => 'thantzinaung@gmail.com',
                'phone' => '09792134861',
                'classroom_id' => $classrooms['Grade 4 - A'],
            ],
            [
                'name' => 'Zaw Min Htet',
                'father_name' => 'Father name',
                'student_code' => 'STU-00008',
                'email' => 'zawminhtet@gmail.com',
                'phone' => '09792134862',
                'classroom_id' => $classrooms['Grade 4 - B'],
            ],
            [
                'name' => 'Myo Thant Lin',
                'father_name' => 'Father name',
                'student_code' => 'STU-00009',
                'email' => 'myothantlin@gmail.com',
                'phone' => '09792134863',
                'classroom_id' => $classrooms['Grade 5 - A'],
            ],
            [
                'name' => 'Hla Myo Aung',
                'father_name' => 'Father name',
                'student_code' => 'STU-00010',
                'email' => 'hlamyoaung@gmail.com',
                'phone' => '09792134864',
                'classroom_id' => $classrooms['Grade 5 - B'],
            ],
            [
                'name' => 'Nay Lin Htet',
                'father_name' => 'Father name',
                'student_code' => 'STU-00011',
                'email' => 'naylinhtet@gmail.com',
                'phone' => '09792134865',
                'classroom_id' => $classrooms['Grade 6 - A'],
            ],
            [
                'name' => 'Sai Htet Naing',
                'father_name' => 'Father name',
                'student_code' => 'STU-00012',
                'email' => 'saihtetnaing@gmail.com',
                'phone' => '09792134866',
                'classroom_id' => $classrooms['Grade 6 - B'],
            ],
            [
                'name' => 'Ye Min Zaw',
                'father_name' => 'Father name',
                'student_code' => 'STU-00013',
                'email' => 'yeminzaw@gmail.com',
                'phone' => '09792134867',
                'classroom_id' => $classrooms['Grade 7 - A'],
            ],
            [
                'name' => 'Phyo Min Htet',
                'father_name' => 'Father name',
                'student_code' => 'STU-00014',
                'email' => 'phyominhtet@gmail.com',
                'phone' => '09792134868',
                'classroom_id' => $classrooms['Grade 7 - B'],
            ],
            [
                'name' => 'Thura Aung Min',
                'father_name' => 'Father name',
                'student_code' => 'STU-00015',
                'email' => 'thuraaungmin@gmail.com',
                'phone' => '09792134869',
                'classroom_id' => $classrooms['Grade 8 - A'],
            ],
            [
                'name' => 'Htet Htet Aung',
                'father_name' => 'Father name',
                'student_code' => 'STU-00016',
                'email' => 'htethtetaung@gmail.com',
                'phone' => '09792134870',
                'classroom_id' => $classrooms['Grade 8 - B'],
            ],
            [
                'name' => 'Kaung Myat Zaw',
                'father_name' => 'Father name',
                'student_code' => 'STU-00017',
                'email' => 'kaungmyatzaw@gmail.com',
                'phone' => '09792134871',
                'classroom_id' => $classrooms['Grade 9 - A'],
            ],
            [
                'name' => 'Min Khant Htet',
                'student_code' => 'STU-00018',
                'father_name' => 'father name',
                'email' => 'minkhanthtet@gmail.com',
                'phone' => '09792134872',
                'classroom_id' => $classrooms['Grade 9 - B'],
            ],
            [
                'name' => 'Aung Pyae Min',
                'father_name' => 'Father name',
                'student_code' => 'STU-00019',
                'email' => 'aungpyaemin@gmail.com',
                'phone' => '09792134873',
                'classroom_id' => $classrooms['Grade 10 - A'],
            ],
            [
                'name' => 'Lin Htet Aung',
                'father_name' => 'Father name',
                'student_code' => 'STU-00020',
                'email' => 'linhtetaung@gmail.com',
                'phone' => '09792134874',
                'classroom_id' => $classrooms['Grade 10 - B'],
            ],
        ];
        foreach ($students as $student) {
            Student::create($student);
        }
    }
}
