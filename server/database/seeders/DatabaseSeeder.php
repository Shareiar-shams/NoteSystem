<?php

namespace Database\Seeders;

use App\Models\Company\Company;
use App\Models\Note\Note;
use App\Models\Tag\Tag;
use App\Models\User;
use App\Models\Workspace\Workspace;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        // Truncate tables to avoid unique constraint violations on re-runs
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('notes')->truncate();
        DB::table('note_tag')->truncate();
        DB::table('tags')->truncate();
        DB::table('workspaces')->truncate();
        DB::table('companies')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $faker = Faker::create();

        // Seed 1000 workspaces (assuming ~100 companies for variety)
        Company::factory()->count(100)->create()->each(function ($company) use ($faker) {
            Workspace::factory()->count(10)->create(['company_id' => $company->id]); // 1000 total
        });

        // Seed tags
        for ($i = 0; $i < 50; $i++) {
            $name = $faker->unique()->word;
            Tag::create(['name' => $name, 'slug' => Str::slug($name)]);
        }

        // Seed 10,000 notes in chunks to avoid memory issues
        $workspaces = Workspace::all();
        $tags = Tag::all();
        $chunkSize = 1000;
        for ($i = 0; $i < 10; $i++) {
            $notes = [];
            for ($j = 0; $j < $chunkSize; $j++) {
                $notes[] = [
                    'title' => $faker->sentence(3),
                    'content' => $faker->paragraphs(3, true),
                    'type' => $faker->randomElement(['public', 'private']),
                    'is_draft' => $faker->boolean(10),
                    'workspace_id' => $workspaces->random()->id,
                    'created_at' => $faker->dateTimeThisYear,
                    'updated_at' => now(),
                ];
            }
            Note::insert($notes);

            // Attach random tags to each note in chunk
            $newNotes = Note::orderBy('id', 'desc')->take($chunkSize)->get();
            foreach ($newNotes as $note) {
                $randomTags = $tags->random(rand(0, 5));
                if ($randomTags->isNotEmpty()) {
                    $note->tags()->attach($randomTags->pluck('id')->toArray());
                }
            }
        }
    }
}
