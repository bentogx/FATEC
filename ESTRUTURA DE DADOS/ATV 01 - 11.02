#include <stdio.h>

int exponenciacaoRecur(int x, int y){
    if(y==0){
        return 1;
    }else{
        return x*exponenciacaoRecur(x, y-1);
    }
}

int fiboRecur(int x){ //sendo X a posição do número que queremos na sequência
    if(x>1){
        return fiboRecur(x-1) + fiboRecur(x-2);
    }else{
        if(x==0){return 0;}
        else{return 1;}
    }
}

int main()
{
    printf("Resultado 2 elevado a 4: %i\n", exponenciacaoRecur(2,4));
    printf("Resultado da 13 posicao: %i", fiboRecur(13));

    return 0;
}
