<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Inertia\Inertia;
use App\Repositories\UserRepositoryInterface;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Carbon;

class UserController extends Controller
{
    protected UserRepositoryInterface $userRepository;

    public function __construct(UserRepositoryInterface $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function index()
    {
        $users = $this->userRepository->getUsers()->map(function ($user) {
            if ($user->birth_date) {
                $birthYear = Carbon::parse($user->birth_date)->year;
                $currentYear = now()->year;
                $user->age = $currentYear - $birthYear;
            } else {
                $user->age = null;
            }

            return $user;
        });

        return Inertia::render('Home', [
            'users' => $users,
        ]);
    }

    public function create()
    {
        return Inertia::render('CreateUser');
    }

    public function store(StoreUserRequest $request)
    {
        $this->userRepository->saveUser($request->validated());
        
        return redirect('/')
            ->with('success', 'User created successfully.');
    }

    public function edit(User $user)
    {
        return Inertia::render('EditUser', [
            'user' => $user
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        $this->userRepository->updateUser($user->id, $request->validated());

        return redirect('/')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $this->userRepository->deleteUser($user->id);

        return redirect('/')->with('success', 'User deleted successfully.');
    }
}
