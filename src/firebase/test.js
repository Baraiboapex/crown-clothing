import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseTest = () => {
    const fbs = firebase.firestore(),
        queryFbsTest = fbs.doc('users/kQ5B2fW2ukIwXg2nabHP/cartItems/HhYHizWSr9W5D8RqdtIw');

    console.log(queryFbsTest);
}

export default firebaseTest;



