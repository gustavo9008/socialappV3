import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

function AllPosts(props) {
  const router = useRouter();

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
          <div className="author-container">
            <span className="text-gray-400 text-xs">{props.posts.created}</span>
          </div>
        </div>
        <Link href={"/post/" + props.posts.id}>
          <a
            // href={"/api/post/" + props.posts.id}
            // onClick={(e) => linkHandleClick(e)}
            id=""
            className="article-link text-xl my-0 ml-12 Psm:ml-0 text-gray-300 tracking-wide"
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
