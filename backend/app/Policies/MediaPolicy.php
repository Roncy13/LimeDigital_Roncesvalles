<?php

namespace App\Policies;

use App\User;
use App\Models\Media;
use App\Services\MediaService;
use Illuminate\Auth\Access\HandlesAuthorization;

class MediaPolicy
{
    use HandlesAuthorization;
    private $service;
    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct(MediaService $service)
    {
        $this->service = $service;
    }

    private function isMediaOwndByUsr($user, $categoryId) {
        $record = $this->service->findById($categoryId);

        return $record->user_id === $user->id;
    }

    public function create(User $user) {
        return true;
    }

    public function update(User $user, Media $media) {
        return $this->isMediaOwndByUsr($user, $media->id);
    }

    public function destroy(User $user, Media $media) {
        return $this->isMediaOwndByUsr($user, $media->id);
    }
}
