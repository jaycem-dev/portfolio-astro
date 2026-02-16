export const prerender = false;

export const GET = async () => {
    const res = await fetch(
        "https://raw.githubusercontent.com/jaycem-dev/nix/master/install.sh",
    );
    return new Response(await res.text(), {
        headers: {
            "Content-Type": "text/x-shellscript",
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
            Expires: "0",
        },
    });
};
