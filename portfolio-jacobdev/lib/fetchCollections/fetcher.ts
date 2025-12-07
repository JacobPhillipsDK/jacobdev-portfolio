import {fetchList} from "@/lib/payload"


// Top Parts to About me section

interface TopPartProps {
    id: number;
}
export async function fetchTopPartWithID(TopPartProps: TopPartProps) {
    if (!TopPartProps) return null;
    const aboutme = (await fetchList("about-me")).docs;
    return aboutme.find((aboutme) => aboutme.id === TopPartProps.id);
}

// Education Section

export async function fetchAllEducationCollection() {
    return (await fetchList("education")).docs;
}

export async function fetchWorkExperienceCollection() {
    return (await fetchList("workexperience")).docs;
}

export async function fetchPublishedPosts() {
    return (await fetchList("posts")).docs;
}