import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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