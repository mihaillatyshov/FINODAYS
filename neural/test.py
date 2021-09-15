# -*- coding: utf-8 -*-

# -- Sheet --

import pandas as pd
from sklearn.model_selection import train_test_split
import nltk
import string
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import SnowballStemmer
nltk.download('punkt')
nltk.download('stopwords')
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import precision_score, recall_score, precision_recall_curve
from matplotlib import pyplot as plt
from sklearn.metrics import plot_precision_recall_curve
import numpy as np
from sklearn.model_selection import GridSearchCV




df = pd.read_csv("testdata.manual.2009.06.14.csv", sep=",")

df.head()

df.columns=[0, 1, 2, 3, 4, 5]

df.head(5)

df.shape

df.describe

df_new = df.drop([1, 2, 3, 4], axis=1)

df = df_new

df["a"].value_counts()

for c in df[df["a"] == 0][5].head(5):
    print(c)

for c in df[df["a"] == 2][5].head(5):
    print(c)

for c in df[df["a"] == 4][5].head(5):
    print(c)

train_df, test_df = train_test_split(df, test_size=80)

sentence_example = df.iloc[1][5]
tokens = word_tokenize(sentence_example, language="russian")
tokens_without_punctuation = [i for i in tokens if i not in string.punctuation]
russian_stop_words = stopwords.words("russian")
tokens_without_stop_words_and_punctuation = [i for i in tokens_without_punctuation if i not in russian_stop_words]
snowball = SnowballStemmer(language="russian")
stemmed_tokens = [snowball.stem(i) for i in tokens_without_stop_words_and_punctuation]

print(f"Исходный текст: {sentence_example}")
print("-----------------")
print(f"Токены: {tokens}")
print("-----------------")
print(f"Токены без пунктуации: {tokens_without_punctuation}")
print("-----------------")
print(f"Токены без пунктуации и стоп слов: {tokens_without_stop_words_and_punctuation}")
print("-----------------")
print(f"Токены после стемминга: {stemmed_tokens}")
print("-----------------")

snowball = SnowballStemmer(language="russian")
russian_stop_words = stopwords.words("russian")

def tokenize_sentence(sentence: str, remove_stop_words: bool = True):
    tokens = word_tokenize(sentence, language="russian")
    tokens = [i for i in tokens if i not in string.punctuation]
    if remove_stop_words:
        tokens = [i for i in tokens if i not in russian_stop_words]
    tokens = [snowball.stem(i) for i in tokens]
    return tokens

tokenize_sentence(sentence_example)

vectorizer = TfidfVectorizer(tokenizer=lambda x: tokenize_sentence(x, remove_stop_words=True))

features = vectorizer.fit_transform(train_df[5])

model = LogisticRegression(random_state=0)
model.fit(features, train_df["a"])

model.predict(features["a"])

train_df[5].iloc["a"]

model_pipeline = Pipeline([
    ("vectorizer", TfidfVectorizer(tokenizer=lambda x: tokenize_sentence(x, remove_stop_words=True))),
    ("model", LogisticRegression(random_state=0))
]
)

model_pipeline.fit(train_df[5], train_df["a"])

model_pipeline.predict(["Hello, are you okay?"])

model_pipeline.predict(["Hello"])

model_pipeline.predict(["fuck you"])

model_pipeline.predict(["hello, I really don't like this"])

