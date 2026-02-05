"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from "@/lib/supabase/client";
import { Trash } from 'lucide-react'
import { title } from 'process';

type Text = {
    text: string
    id: number,
    isDone: boolean

}



const Card = ({ text, id, isDone }: Text) => {
  const router = useRouter()
  const [testDone, setTestDone] = React.useState(!!isDone)
   const[isEditing, setIsEditing] = React.useState(false);
  const [editedText, setEditedText] = React.useState(text);

  const updateText = async () => {
    try {
      const { error } = await supabase
        .from('data')
        .update({ title: editedText })
        .eq('id', id);

      if (error) throw error;
      
      setIsEditing(false);
      console.log('Card updated successfully');
      router.refresh();
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };


  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextValue = e.target.checked; // what the user chose

    // 1️⃣ update UI immediately
    setTestDone(nextValue);

    // 2️⃣ push change to Supabase
    const { error } = await supabase
      .from("data")
      .update({ is_done: nextValue })
      .eq("id", id);

    // 3️⃣ if Supabase rejects it, undo the UI change
    if (error) {
      setTestDone(!nextValue);
      console.error(error.message);
    } else {
      // 4️⃣ refresh to update the server-rendered list
      router.refresh();
    }
  };
  const handleDelete = async (id: number) => {
  if (window.confirm('Are you sure you want to delete this card?')) {
    try {
      const { error } = await supabase
        .from('data')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      console.log('Card deleted successfully');
      router.refresh();

    } catch (error) {
      console.error('Error deleting card:', error);
    }
  }
};
  return (
    <div className='flex gap-5'>
        <input type="checkbox" checked={testDone} className='w-5 h-5 accent-green-500' onChange={handleChange}/>

        {isEditing ? (
        <input 
          type="text"
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          onBlur={updateText}
          onKeyDown={(e) => e.key === 'Enter' && updateText()}
          className='border px-2 py-1 rounded flex-1'
          autoFocus
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className='cursor-pointer flex-1'>
          {text}
        </span>
      )}
        <button className='ml-auto' onClick={() => handleDelete(id)}><Trash className='h-4'/></button>
    </div>
  )
}

export default Card