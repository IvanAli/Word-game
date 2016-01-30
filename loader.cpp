#include <bits/stdc++.h>
using namespace std;

void fillDictionary(set<string>& dict, char* path) {
    ifstream in;
    string line;
    in.open(path);
    while (getline(in, line)) {
        dict.insert(line);
    }
    in.close();
}

string getRandomWord(set<string>& dict) {
    srand((unsigned int) time (NULL));
    set<string>::iterator it = dict.begin();
    int size = dict.size();
    int index = rand() % size;
    advance(it, index);
    return *it;
}

int main() {
    set<string> dict;
    fillDictionary(dict, (char*)"/usr/share/dict/words");
    string word = getRandomWord(dict);
    cout << word << endl;
    return 0;
}
