const ImageGroup = ({
    urls
}) => {
    const firstFiveUrls = urls?.slice(0, 5)
    console.log(urls, firstFiveUrls)
    return <div className="imageGroup">
        {
            firstFiveUrls.map(url => <span className="w-8 h-8 inline-block rounded-full -ml-3" key={url}>
                <img className="w-full h-full object-cover rounded-full border" src={url} />
            </span>)
        }
        {
            urls.length > 5 &&
            <span className="w-8 h-8 inline-block rounded-full border">
                +{urls.length - 5}
            </span>
        }
    </div>
}

export { ImageGroup }