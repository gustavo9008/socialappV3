import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function AllPosts(props) {
  const router = useRouter();

  // console.log(props.posts.userProfile);

  const linkHandleClick = (e) => {
    e.preventDefault();
    let url = e.target.href;
    router.push(url);
  };

  return (
    <article
      id=""
      className="link-card homepage-card card Psm:mb-2 Psm:w-full Psm:border-l-0 Psm:border-r-0 Psm:border-t Psm:border-b Psm:border-indigo-900 Psm:shadow-none Psm:rounded-none bg-gray-800"
    >
      <figure className="aspect-w-4 aspect-h-2 mb-2">
        {props.posts.image ? (
          <Image
            className="object-cover"
            src={props.posts.image}
            layout="fill"
            alt="this is a picture"
            priority="true"
          />
        ) : (
          <Image
            className="object-cover"
            src={props.posts.imageUrl}
            layout="fill"
            alt="this is a picture"
          />
        )}
      </figure>
      <section className="px-4 py-2">
        <div className="user-container mb-2">
          {!props.posts.userProfile.profileImage && (
            <div className="user-profile-image">
              <span
                className="block h-10 w-10 rounded-full"
                style={{
                  background: `conic-gradient(${props.posts.userProfile.profileGenericPic[0]}, ${props.posts.userProfile.profileGenericPic[1]}, ${props.posts.userProfile.profileGenericPic[2]}, ${props.posts.userProfile.profileGenericPic[3]}, ${props.posts.userProfile.profileGenericPic[4]}, ${props.posts.userProfile.profileGenericPic[5]}, ${props.posts.userProfile.profileGenericPic[6]}, ${props.posts.userProfile.profileGenericPic[7]})`,
                }}
              ></span>
            </div>
          )}
          {props.posts.userProfile.profileImage && (
            <span className="user-profile-image">
              {" "}
              <img
                loading="lazy"
                className="h-10 w-10 rounded-full"
                src={props.posts.userProfile.profileImage}
                alt=""
              />
            </span>
          )}
          <div className="author-container">
            <span className="text-sm text-gray-300">
              <Link href={"/user/" + props.posts.userProfile.id}>
                <a className="clickable"> {props.posts.userProfile.name} </a>
              </Link>
            </span>
            <span className="text-xs text-gray-400">{props.posts.created}</span>
          </div>
        </div>
        <Link href={"/post/" + props.posts.id}>
          <a
            id=""
            className="article-link Psm:ml-0 my-0 ml-12 text-xl tracking-wide text-gray-300"
            aria-label="article title"
          >
            {props.posts.title}
          </a>
        </Link>
      </section>
    </article>
  );
}

export default AllPosts;
