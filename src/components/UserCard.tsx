export default function UserCard(props: {photo?: string; firstname: string; lastname: string; href?: string;}){
  const content = (
    <div class="bg-[#2e2e2e] p-4 rounded-lg text-center shadow-md hover:opacity-90 transition">
      <img
        src={props.photo || "/images/profile_photos/icone_profile.png"}
        alt="Photo de profil"
        class="w-22 h-22 rounded-full mx-auto mb-1 object-cover opacity-80"
      />
      <p class="text-white text-lg">{props.firstname}</p>
      <p class="text-white text-lg">{props.lastname}</p>
    </div>
  );

  return props.href ? <a href={props.href}>{content}</a> : content;
}