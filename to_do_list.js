let todos = new Vue({
    el:"#todobox",
    data:{
        arr:[],
        arr2:[],
        num_id:0,
        todo_text:"",
        all:true,
        list:"all"
    },
    watch:{
        arr:function(val){
            if(this.list!="all"){
                todos.list_view(this.list);
            }
        }
    },
    methods:{
        add_todos(){
            if(!this.todo_text){
                alert("please add To Do List");
                this.$refs.f_text.focus();
            }
            else{
                this.arr.push([this.todo_text, "yet", this.num_id]);
                this.todo_text="";
                this.num_id++;
            }
        },
        imdone(nid){
            this.arr.filter(function(array,node,all){
                let ser = array.indexOf(nid);
                if(ser!=-1){
                    if(array[1] == "yet"){
                        document.getElementById("dotolist").childNodes[node].className = "done";
                        return array[1] = "done";
                        
                    }
                    else{
                        document.getElementById("dotolist").childNodes[node].className = "yet";
                        return array[1] = "yet";
                    }
                }
            });
        },
        del_todo(nid){
            this.arr.filter(function(array,node,all){
                let ser = array.indexOf(nid);
                if(ser!=-1){
                   todos.arr.splice(node,1);
                }
            });
        },
        del_all(){
            this.arr=[];
            this.arr2=[];
        },
        list_view(w){
            this.list = w;
            this.all = false;
            this.arr2 = [];
            this.arr.filter(function(array,node,all){
                let ser = array.indexOf(w);
                if(ser!=-1){
                    todos.arr2.push(array);
                }
            });
        }
    }
});