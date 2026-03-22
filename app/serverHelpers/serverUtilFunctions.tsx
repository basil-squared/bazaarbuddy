import 'server-only'



export async function fetchInCachableSegments(args: Parameters<typeof fetch>): Promise<Blob> {
    // The 'Range' of cachable segments that next supports
    const contentPart: number = 2097152
    const contentSizeRequest = await fetch(args[0], {
        method: 'HEAD',

    })
    if (!contentSizeRequest.ok) {
        throw new Error(`Content Size Request not okay. error status code: ${contentSizeRequest.status}`)
    }
    const contentLength: string = contentSizeRequest.headers.get('content-length') ?? '0'
    if (contentLength == '0') {
        throw new Error('Invalid Request Size 0')


    }
    const sizeInBytes = parseInt(contentLength, 10)
    // Determine if we actually need to split the request in order to cache it
    if (sizeInBytes > contentPart) {
        // we do, let's start splitting 

        // math.floor required here as any decimal just means another part.
        const chunksRequired = Math.floor(contentPart / sizeInBytes)
    } else {

    }






    const retBlob: Blob = 

    return retBlob
}