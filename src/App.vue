<template>
  <TheHeader />
  <div class="" v-if="state.username === '' || state.username === null">
    <div
      class="bg-no-repeat bg-cover bg-center relative bg-transparent"
      style="
        background-image: url(https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1951&amp;q=80);
      "
    >
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
                <label class="text-sm font-medium text-gray-700 tracking-wide"
                  >Name</label
                >
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
    </div>
  </div>

  <div class="view chat px-6" v-else>
    <header>
      <button class="logout px-2" @click="logout">Logout</button>
      <h1 class="text-white font-bold">Welcome, {{ state.username }}！</h1>
    </header>

    <section class="chat-box">
      <div
        v-for="message in state.messages"
        :key="message.key"
        :class="message.username == state.username ? 'message current-user' : 'message'"
      >
        <div class="message-inner">
          <div class="username">{{ message.username }}</div>
          <div class="content">{{ message.content }}</div>
        </div>
      </div>
    </section>

    <footer>
      <form @submit.prevent="sendMessage">
        <input
          type="text"
          placeholder="メッセージを入力してください"
          v-model="inputMessage"
          required
        />
        <input type="submit" value="Send" />
      </form>
    </footer>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import firebase from "./db";
import TheHeader from "@/components/TheHeader.vue";

export default {
  components: {
    TheHeader,
  },
  setup() {
    const inputUsername = ref("");
    const inputMessage = ref("");

    console.log(inputUsername);

    const state = reactive({
      username: "",
      content: "",
      messagaes: [],
    });

    const login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = "";
      }
    };

    const logout = () => {
      state.username = "";
    };

    const sendMessage = () => {
      const newMessage = firebase.database().ref("messages").push();

      const key_id = newMessage.key;

      newMessage.set({
        id: key_id,
        username: state.username,
        content: inputMessage.value,
        created_at: firebase.database.ServerValue.TIMESTAMP,
      });

      inputMessage.value = "";
    };

    onMounted(() => {
      const messagesRef = firebase.database().ref("messages");
      messagesRef.on("value", (snapshot) => {
        const data = snapshot.val();
        let messages = [];
        Object.keys(data).forEach((key) => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content,
          });
        });
        state.messages = messages;
        // var elm = document.documentElement;
        // //scrollHeight ページの高さ clientHeight ブラウザの高さ
        // var bottom = elm.scrollHeight - elm.clientHeight;
        // //垂直方向へ移動
        // window.scroll(0, bottom);
      });
    });

    return {
      inputUsername,
      inputMessage,
      state,
      login,
      logout,
      sendMessage,
    };
  },
};
</script>

<style lang="scss">
.welcome-header {
  background-color: #41acb6;
}
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.view {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-color: #41acb6;

  &.login {
    align-items: center;
    .login-form {
      display: block;
      width: 100%;
      padding: 15px;

      .form-inner {
        display: block;
        background-color: #fff;
        padding: 50px 15px;
        border-radius: 16px;
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
        h1 {
          color: #aaa;
          font-size: 28px;
          margin-bottom: 30px;
        }
        label {
          display: block;
          margin-bottom: 5px;
          color: #aaa;
          font-size: 16px;
          transition: 0.4s;
        }
        input[type="text"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px;
          margin-bottom: 15px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }
        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          background-color: #ea526f;
          border-radius: 8px;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
        &:focus-within {
          label {
            color: #ea526f;
          }
          input[type="text"] {
            background-color: #fff;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
            &::placeholder {
              color: #666;
            }
          }
        }
      }
    }
  }
  &.chat {
    flex-direction: column;
    header {
      position: relative;
      display: block;
      width: 100%;
      padding: 10px 30px 10px;
      .logout {
        position: absolute;
        top: 15px;
        right: 15px;
        appearance: none;
        border: none;
        outline: none;
        background: none;

        color: #fff;
        font-size: 18px;
        margin-bottom: 10px;
        text-align: right;
      }
      h1 {
        color: #fff;
      }
    }
    .chat-box {
      border-radius: 24px 24px 0px 0px;
      background-color: #fff;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      flex: 1 1 100%;
      padding: 30px;
      .message {
        display: flex;
        margin-bottom: 15px;

        .message-inner {
          .username {
            color: #888;
            font-size: 16px;
            margin-bottom: 5px;
            padding-left: 15px;
            padding-right: 15px;
          }
          .content {
            display: inline-block;
            padding: 10px 20px;
            background-color: #f3f3f3;
            border-radius: 999px;
            color: #333;
            font-size: 18px;
            line-height: 1.2em;
            text-align: left;
          }
        }
        &.current-user {
          margin-top: 30px;
          justify-content: flex-end;
          text-align: right;
          .message-inner {
            max-width: 75%;
            .content {
              color: #fff;
              font-weight: 600;
              background-color: #ea526f;
            }
          }
        }
      }
    }
    footer {
      position: sticky;
      bottom: 0px;
      background-color: #fff;
      padding: 30px;
      box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
      form {
        display: flex;
        input[type="text"] {
          flex: 1 1 100%;
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          width: 100%;
          padding: 10px 15px;
          border-radius: 8px 0px 0px 8px;

          color: #333;
          font-size: 18px;
          box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
          background-color: #f3f3f3;
          transition: 0.4s;
          &::placeholder {
            color: #888;
            transition: 0.4s;
          }
        }

        input[type="submit"] {
          appearance: none;
          border: none;
          outline: none;
          background: none;
          display: block;
          padding: 10px 15px;
          border-radius: 0px 8px 8px 0px;
          background-color: #ea526f;
          color: #fff;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
