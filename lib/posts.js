import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostData() {
    // /postディレクトリのファイル名を取得
    const fileNames = fs.readdirSync(postDirectory)
    const allPostData = fileNames.map(fileName => {
        // ファイル名から.md を取り除いて、idを取得
        const id = fileName.replace(/\.md$/, '')

        // マークダウンファイルを文字列とする
        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // gray-matterライブラリを使ってメタデータセクションを解析
        const matterResult = matter(fileContents)

        // 解析データとidを結合する
        return {
            id,
            ...matterResult.data
        }
    })

    //日付順にソート
    return allPostData.sort(({date: a}, {date: b}) => {
        if (a < b) {
            return 1
        } else if ( a > b ) {
            return -1
        } else {
            return 0
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postDirectory)

    // arrray　を下記のように返す

    // [
    //     {
    //         params: {
    //             id: 'ssg-ssr'
    //         }
    //     },
    //     {
    //         paramas: {
    //             id: 'pre-rendering'
    //         }
    //     }
    // ]

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullPath = path.join(postDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // gray-matterライブラリを使ってメタデータセクションを解析
    const matterResult = matter(fileContents)

    //remarkを使ってmarkdownをHTMLへ変換
    const processedContent = await remark()
    .use(html)
    .process(matterResult.content)

    const contentHtml = processedContent.toString()


    // idとdataを結合
    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}