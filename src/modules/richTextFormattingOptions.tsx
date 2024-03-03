//Custom rendering options for article content
import {Block, BLOCKS, Inline, INLINES} from '@contentful/rich-text-types';
import Image from 'next/image';
import Link from 'next/link';
import {ReactNode} from 'react';

export const options = {
    preserveWhitespace: true,
    renderNode: {
        // Render embedded Image, use image description as a subtitle
        [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
            if (!('target' in node.data)) {
                return null;
            }
            const {fields} = node.data.target as {
                fields: {
                    file: { url: string; contentType: string };
                    title: string;
                    description: string;
                };
            };
            return (
                <>
                    {fields.file.contentType === 'image/webp' && (
                        <div>
                            <div className="relative h-80 bg-custom-lightgrey">
                                <Image
                                    className="object-contain"
                                    src={`https:${fields.file.url}`}
                                    alt={fields.title}
                                    fill
                                />
                            </div>
                            {fields.description && (
                                <p className="my-2">{fields.description}</p>
                            )}
                        </div>
                    )}
                    {fields.file.contentType === 'application/pdf' && (
                        <Link
                            className="font-semibold hover:underline"
                            href={`https:${fields.file.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {fields.title}
                        </Link>
                    )}
                </>
            );
        },
        // Set heading text sizes with tailwind
        [BLOCKS.HEADING_1]: (_: Block | Inline, children: ReactNode) => (
            <h1 className="text-4xl">{children}</h1>
        ),
        [BLOCKS.HEADING_2]: (_: Block | Inline, children: ReactNode) => (
            <h2 className="text-3xl">{children}</h2>
        ),
        [BLOCKS.HEADING_3]: (_: Block | Inline, children: ReactNode) => (
            <h3 className="text-2xl">{children}</h3>
        ),
        [BLOCKS.HEADING_4]: (_: Block | Inline, children: ReactNode) => (
            <h4 className="text-xl">{children}</h4>
        ),
        [BLOCKS.HEADING_5]: (_: Block | Inline, children: ReactNode) => (
            <h5 className="text-lg">{children}</h5>
        ),
        // Set list style
        [BLOCKS.UL_LIST]: (_: Block | Inline, children: ReactNode) => (
            <ul className="list-disc pl-10 leading-loose">{children}</ul>
        ),
        [BLOCKS.OL_LIST]: (_: Block | Inline, children: ReactNode) => (
            <ol className="list-decimal pl-10 leading-loose">{children}</ol>
        ),
        [INLINES.HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
            const hostname =
                typeof window !== 'undefined' ? window.location.hostname : '';
            let linkHostname: string;
            if (!('uri' in node.data)) {
                return null;
            }
            try {
                linkHostname = new URL(node.data.uri as string).hostname;
            } catch (e) {
                // If the conversion fails the link is most likely in the form of /slug
                linkHostname = hostname;
            }

            return (
                <Link
                    href={node.data.uri as string}
                    target={linkHostname === hostname ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    className="font-semibold hover:underline"
                >
                    {children}
                </Link>
            );
        },
        [INLINES.ASSET_HYPERLINK]: (node: Block | Inline, children: ReactNode) => {
            const {target} = node.data as {
                target: {
                    fields: {
                        file: {
                            url: string;
                        };
                    };
                };
            };
            return (
                <Link
                    className="font-semibold hover:underline"
                    href={`https:${target.fields.file.url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {children}
                </Link>
            );
        },
    },
};
