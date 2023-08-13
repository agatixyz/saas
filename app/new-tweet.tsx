import { User, createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const dynamic = "force-dynamic";

export default function NewTweet({ user }: { user: User }) {
  const addTweet = async (formData: FormData) => {
    "use server";
    // console.log("Submitted");
    const title = String(formData.get("title"));
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.from("tweets").insert({ title, user_id: user?.id });
    revalidatePath("/");
  };

  return (
    <form className="border border-gray-800 border-t-0" action={addTweet}>
      <div className="flex py-8 px-4">
        <div className="h-12 w-12">
          {/* <Image
            src={user.user_metadata.avatar_url}
            alt="user avatar"
            width={48}
            height={48}
            className="rounded-full"
          /> */}
          <Avatar>
            <AvatarImage src={user.user_metadata.avatar_url} />
            <AvatarFallback>user avatar</AvatarFallback>
          </Avatar>
        </div>
        <input
          name="title"
          className="bg-inherit flex-1 ml-2 text-2xl leading-loose placeholder-gray-500 px-2"
          placeholder="What is happening?!"
        />
      </div>
    </form>
  );
}
