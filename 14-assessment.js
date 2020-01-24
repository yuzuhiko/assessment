'use strict';

const userNameInput = document.getElementById('user-name');
const assesmentButton = document.getElementById('assesment');
const resultDiv = document.getElementById('result-area');
const tweetDiv = document.getElementById('tweet-area');

const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
    '{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
    '{userName}の良くないは無関心さです。{userName}の寒々しい雰囲気や立ち振る舞いに多くの人が冷やされています。',
    '{userName}のどやさところは服装です。{userName}の奇抜すぎるフルーツ型のドレスや立ち振る舞いに多くの人が癒やされています。どやさ。',
    '{userName}の超どやさところは眼力です。{userName}のくりくりしたお目々や立ち振る舞いに多くの人が癒やされています。どやさどやさ。'
    
];




var assesmentTimes = 0;

userNameInput.onkeydown = function(event){
    if (event.key === 'Enter'){
        console.log('enter');
        assesmentButton.onclick();
    }
};


assesmentButton.onclick = function(){

    const userName = userNameInput.value;

    console.log('ボタンが押されました');
    if (userName.length === 0) {
        return;                 //名前が空なら処理終了
    }

    assesmentTimes++;

    console.log(userName);
    
    //TD 診断結果表示エリアの作成
    /*
    while (resultDiv.firstChild){ // 子どもの要素があるかぎり削除
        resultDiv.removeChild(resultDiv.firstChild);
    }*/
    removeAllChildren(resultDiv);

    const header = document.createElement('h3');
    header.innerText = '診断結果';//('+ assesmentTimes + '回目)';
    resultDiv.appendChild(header);

    const p = document.createElement('p');
    const result = assessment(userName);
    p.innerText = result;
    resultDiv.appendChild(p);

    //TD ツイートエリアの作成
    removeAllChildren(tweetDiv);
    /*
    const tweet = document.createElement('h3');
    tweet.innerText = 'test.';
    tweetDiv.appendChild(tweet);
    */
   const anchor = document.createElement('a');
   const hrefValue = "https://twitter.com/intent/tweet?button_hashtag=" + encodeURIComponent('あなたのいいところ')+ '&ref_src=twsrc%5Etfw';
   
   anchor.setAttribute('href', hrefValue);
   anchor.className = 'twitter-hashtag-button';
   //anchor.setAttribute('data-text', '診断結果の文章');
   anchor.setAttribute('data-text', result);
   anchor.innerText = 'Tweet #あなたのいいところx';
   tweetDiv.appendChild(anchor);

   //widgets.jsの設定 
   const script = document.createElement('script');
   script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
   tweetDiv.appendChild(script);


};

/**
 * 指定した要素の子供をすべて削除する
 * @param {HTMLElement} elemnt HTMLの要素
  */
function removeAllChildren(element){
    while (element.firstChild){ // 子どもの要素があるかぎり削除
        element.removeChild(element.firstChild);
    }
}

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
    //全文字のコード番号を取得して、それを足し合わせる。
    let sumOfCharCode = 0;
    for (let i =0; i < userName.length; i++){
        sumOfCharCode += userName.charCodeAt(i);
    }

    //文字のコード番号の合計を回答の数で割って添字の数値を求める。
    const index = sumOfCharCode % answers.length;
    let result = answers[index];

    result = result.replace(/\{userName\}/g, userName);

    return result;
  
}

console.assert(
    assessment('太郎') === '太郎のいいところは決断力です。太郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );

  console.assert(
    assessment('太郎') === assessment('太郎'), '単一の入力に対して、同じ出力が返っていません'
  );


