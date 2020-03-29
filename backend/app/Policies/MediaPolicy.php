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

    public function create(User $user) {
        return true;
    }

    public function update(User $user, Media $media) {
        $media = $this->service->findById($media->id);

        return $media->user_id === $user->id;
    }
}
