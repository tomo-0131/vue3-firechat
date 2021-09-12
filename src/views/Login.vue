<template>
  <div class="absolute bg-red-400 opacity-60 inset-0 z-0"></div>
  <div class="min-h-screen sm:flex sm:flex-row mx-0 justify-center">
    <div class="flex-col flex self-center p-10 sm:max-w-5xl xl:max-w-2xl z-10">
      <div class="self-start hidden lg:flex flex-col text-white">
        <img src="" class="mb-3" />
        <h1 class="mb-3 font-bold text-5xl">Welcom to FireChat!!</h1>
        <p class="pr-3">FireChatで世界中の人と気軽にチャットをしましょう！</p>
      </div>
    </div>
    <div class="flex justify-center self-center z-10">
      <div class="p-12 bg-white mx-auto rounded-2xl w-100 z-10">
        <div class="mb-4">
          <h3 class="py-2 font-semibold text-2xl text-gray-800">Sign In</h3>
          <p class="text-gray-500">名前を入力してチャットを始めましょう</p>
        </div>
        <div class="space-y-5">
          <div class="space-y-2">
            <label class="text-sm font-medium text-gray-700 tracking-wide">Name</label>
            <input
              class="w-full text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
              type=""
              placeholder="Nickname here"
              v-model="inputUsername"
            />
          </div>
          <!-- <div class="space-y-2">
                <label class="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                  Password
                </label>
                <input
                  class="w-full content-center text-base px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-400"
                  type=""
                  placeholder="Enter your password"
                /> -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
              />
              <label for="remember_me" class="ml-2 block text-sm text-gray-800">
                Remember me
              </label>
            </div>
          </div>
          <div>
            <form @submit.prevent="login">
              <button
                type="submit"
                class="w-full flex justify-center bg-green-400 hover:bg-green-500 text-gray-100 p-3 rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-500"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
        <div class="pt-5 text-center text-gray-400 text-xs">
          <span>
            Copyright © 2021-2022
            <a
              href="https://twitter.com/en_tomofy"
              rel=""
              target="_blank"
              title="Ajimon"
              class="text-green hover:text-green-500"
              >Tomo</a
            ></span
          >
        </div>
      </div>
    </div>
  </div>
</template>
