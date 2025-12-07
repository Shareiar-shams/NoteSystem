<?php

namespace App\Console\Commands;

use App\Models\NoteHistory\NoteHistory;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CleanHistory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'history:clean';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Delete note histories older than 7 days';

    /**
     * Execute the console command.
     */
    public function handle() {
        NoteHistory::where('changed_at', '<', Carbon::now()->subDays(7))->delete();
        $this->info('Old histories deleted.');
    }
}
