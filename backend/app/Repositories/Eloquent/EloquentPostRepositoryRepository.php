<?php

namespace App\Repositories\Eloquent;

use App\Repository\PostRepository;
use App\Repositories\Contracts\PostRepositoryRepository;

use Kurt\Repoist\Repositories\Eloquent\AbstractRepository;

class EloquentPostRepositoryRepository extends AbstractRepository implements PostRepositoryRepository
{
    public function entity()
    {
        return PostRepository::class;
    }
}
