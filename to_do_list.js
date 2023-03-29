let todos = new Vue({
    el:"#todobox",
    data:{
        arr:[],
        num_id:0,
        todo_text:"",
        list:"all",
        del_btn:false,
        refresh:false
    },
    watch:{
        refresh:function(){
            if(this.refresh){
                this.refresh = false;
            }
        }
    },
    methods:{
        add_todos(){
            this.del_btn = true;
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
            for(let i in this.arr){
                if(this.arr[i][2]==nid){
                    if(this.arr[i][1] == "yet"){
                        document.getElementById("dotolist").childNodes[i].className = "done";
                        this.arr[i][1] = "done";
                        
                    }
                    else{
                        document.getElementById("dotolist").childNodes[i].className = "yet";
                        this.arr[i][1] = "yet";
                    }
                }
            }
            this.refresh = true;
        },
        del_todo(nid){
            for(let i in this.arr){
                if(this.arr[i][2] == nid){
                    todos.arr.splice(i,1);
                }
            }
            if(this.arr.length==0){
                this.del_btn = false;
            }
        },
        del_all(){
            if(confirm("Do you REALLY want to delete ALL?")){
                this.del_btn = false;
                this.arr=[];
            }
        }
    }
});