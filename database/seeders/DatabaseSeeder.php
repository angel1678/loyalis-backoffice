<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolSeeder::class,
            UserSeeder::class,
            ConfiguracionSeeder::class,
            TypeSeeder::class,
            GeographicalDistributionSeeder::class,
            // CoerciveAccountStageSeeder::class,
        ]);
    }
}
