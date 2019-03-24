let arr = [{ id: 1 }, { id: 2 }, { id: 3 }];
function test() {
  arr.some((item) => {
    console.log(item.id);
    if (item.id == 2) {
      return true;
    }
  })
  console.log('不会跳出');
}

test();